/*-------------------------------------------------------------------------------For Display Libraries-------------------------------------------------------------------------------*/
#include <ESP8266WiFi.h>
#include <Wire.h>  // Only needed for Arduino 1.6.5 and earlier
#include "SSD1306Wire.h" // legacy include: `#include "SSD1306.h"`

// Initialize the OLED display using Wire library
SSD1306Wire  display(0x3c, D2, D1);  //D2=SDK  D1=SCK  As per labeling on NodeMCU

/*--------------------------------------------------------------------------------For WiFi-------------------------------------------------------------------------------- */
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "NBC_Guest";
const char* password = "nbc1234!";
/*--------------------------------------------------------------------------------Setup----------------------------------------------------------------------------------- */
void displaysetup() {
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
}

void wifisetup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting...");
  }
  Serial.println("Connected!");
}

void setup() {
  wifisetup();
  displaysetup();
  randomSeed(analogRead(0));
}
/*--------------------------------------------------------------------------------Main Program-------------------------------------------------------------------------------- */
String message = "000000";
bool reset = true;
int* pinnum;

void loop() {
  if(reset) {
    pinnum = generatepin();
    pinUI(pinnum);
    reset = false;
    message = "000000";
  }
  else {
    String pass;
    for (int i = 0; i < 6; i++) {
      pass += String(pinnum[i]);
    }
    checkSerial();

    if(message == pass) {
      digitalWrite(LED_BUILTIN,HIGH);
      getblockchaininfo();
    }
    else if (message == "111111")
    {
      reset = true;
    }
    else
    {
      Serial.println("Wrong Pin Number!");
      pinUI(pinnum);
    }
  }
}
/*--------------------------------------------------------------------------------Display Functions-------------------------------------------------------------------------------- */
void displaystring(String message, int x, int y) {
  display.drawString(x, y, message);
}

void pinUI(int* pinseq) {
  display.clear();
  //draw grids
  display.drawHorizontalLine(0, 32, 128);
  display.drawVerticalLine(42, 0, 64);
  display.drawVerticalLine(84, 0, 64);
  //put numbers
  displaystring(String(pinseq[0]), 21 - 4, 16 - 7);
  displaystring(String(pinseq[1]), 63 - 4, 16 - 7);
  displaystring(String(pinseq[2]), 105 - 4, 16 - 7);
  displaystring(String(pinseq[3]), 21 - 5, 48 - 5);
  displaystring(String(pinseq[4]), 64 - 5, 48 - 5);
  displaystring(String(pinseq[5]), 105 - 5, 48 - 5);

  display.display();
}

int sample[] = {1, 2, 3, 4, 5, 6};
int* generatepin() {
  int randnumber;
  static int pinseq[6];
  
  randnumber = random(0, 6);

  for (int i = 0; i < 6; i++) {
    while (sample[randnumber] == 0) {
      randnumber = random(0, 6);
    }
    pinseq[i] = sample[randnumber];
    sample[randnumber] = 0;
  }
  for (int i = 0; i < 6; i++)
  {
    sample[i] = pinseq[i];
  }
  return pinseq;
}
/*--------------------------------------------------------------------------------Blockchain Functions-------------------------------------------------------------------------------- */
String converttoascii(const char* message) {
  String result;
  for (int i = 0; i < strlen(message); i += 2) {
    char val = message[i] > 0x39 ? (message[i] - 'A' + 10) * 16 : (message[i] - '0') * 16;
    val += message[i + 1] > 0x39 ? (message[i + 1] - 'A' + 10) : (message[i + 1] - '0');
    result += val;
  }
  return result;
}

void getblockchaininfo() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http; //Object of class HTTPClient
    http.begin("http://40.90.163.184:3000/transaction/2255387803FA41E9F2FD66A16804F6DF965492344E9C8C19AFDFA76C4D470DFD");
    int httpCode = http.GET();

    if (httpCode > 0) {
      digitalWrite(LED_BUILTIN, HIGH);
      const size_t bufferSize = JSON_OBJECT_SIZE(6) + JSON_OBJECT_SIZE(4) + JSON_OBJECT_SIZE(9) + JSON_OBJECT_SIZE(7) + JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(5) + 370;
      DynamicJsonBuffer jsonBuffer(bufferSize);
      JsonObject& root = jsonBuffer.parseObject(http.getString());

      int height = root["meta"]["height"][0];
      const char* hash = root["meta"]["hash"];
      const char* recipient = root["transaction"]["recipient"];
      const char* message = root["transaction"]["message"]["payload"];
      int mosaic = root["transaction"]["mosaics"][0]["id"][0];
      int mosaicamount = root["transaction"]["mosaics"][0]["amount"][0];

      display.clear();

      displaystring("Block Height: " + String(height), 0, 0);
      displaystring(converttoascii(message), 0, 15);
      displaystring("Mosaic ID: " + String(mosaic), 0, 30);
      displaystring("Mosaic: " + String(mosaicamount), 0, 45);

      display.display();
    }

    http.end(); //Close connection
  }
}
/*--------------------------------------------------------------------------------Serial Functions-------------------------------------------------------------------------------- */
void checkSerial() {
  while (Serial.available() > 0) {
    message = Serial.readString();
  }
}
