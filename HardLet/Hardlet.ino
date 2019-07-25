/*-------------------------------------------------------------------------------For Display Libraries-------------------------------------------------------------------------------*/
#include <ESP8266WiFi.h>
#include <Wire.h>  // Only needed for Arduino 1.6.5 and earlier
#include "SSD1306Wire.h" // legacy include: `#include "SSD1306.h"`

// Initialize the OLED display using Wire library
SSD1306Wire  display(0x3c, D2, D1);  //D2=SDK  D1=SCK  As per labeling on NodeMCU
/*-------------------------------------------------------------------------------Blockchain Info-------------------------------------------------------------------------------*/
String key = ""; //Your private key
String pubkey = ""; //Your public key
/*--------------------------------------------------------------------------------Setup----------------------------------------------------------------------------------- */
void displaysetup() {
  Serial.begin(115200);
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_16);
}

void setup() {
  displaysetup();
  randomSeed(analogRead(D0));
}
/*--------------------------------------------------------------------------------Main Program-------------------------------------------------------------------------------- */
String message = "000000";
String pass = "";
bool reset = true;
int* pinnum;

void loop() {
  if(reset) {
    pinnum = generatepin();
    pinUI(pinnum);
    reset = false;
    message = "000000";                         //sets to 000000 so it returns to default, or else it will keep resetting
  }
  else {
    pass = "";
    for (int i = 0; i < 6; i++) {
      pass += String(pinnum[i]);                //converts pin number to string for comparison with serial
    }

    checkSerial();                              //String message is constantly updated
    if(message.substring(0,6) == pass) {                       //If password is correct
      digitalWrite(LED_BUILTIN,HIGH);           //Blockchain info is shown and mosaic transaction is authorized
      getblockchaininfo();
    }
    else if (message == "111111") {             //If the WPF app sends a 1111111, the wallet goes back into reset mode
      reset = true;                             //Generating a new pin
    }
    else {
      //Serial.println("Wrong Pin Number!");      //If the password is wrong
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
  display.setFont(ArialMT_Plain_16);
  //draw grids
  display.drawHorizontalLine(0, 32, 128);
  display.drawVerticalLine(42, 0, 64);
  display.drawVerticalLine(84, 0, 64);
  //put numbers
  displaystring(String(pinseq[0]), 21 - 4, 16 - 11);
  displaystring(String(pinseq[1]), 63 - 4, 16 - 11);
  displaystring(String(pinseq[2]), 105 - 4, 16 - 11);
  displaystring(String(pinseq[3]), 21 - 5, 48 - 6);
  displaystring(String(pinseq[4]), 64 - 5, 48 - 6);
  displaystring(String(pinseq[5]), 105 - 5, 48 - 6);

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
  for (int i = 0; i < 6; i++) {
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
  display.clear();
  display.setFont(ArialMT_Plain_16);
  displaystring("Connected!", 20, 25);
  display.display();
  Serial.println(pass+String("private")+key);
  Serial.println(pass+String("public")+pubkey);     
}
/*--------------------------------------------------------------------------------Serial Functions-------------------------------------------------------------------------------- */
void checkSerial() {
  while (Serial.available() > 0) {
    message = Serial.readString();
  }
}
