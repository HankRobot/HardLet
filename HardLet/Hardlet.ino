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

void displaysetup(){
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
}

void wifisetup(){
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT); 
  pinMode(2, OUTPUT); 
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(1000);
    Serial.println("Connecting...");
  }
  Serial.println("Connected!");
}

String converttoascii(const char* message)
{
  String result;
  for (int i = 0; i < strlen(message); i += 2) {
    char val = message[i] > 0x39 ? (message[i] - 'A' + 10) * 16 : (message[i] - '0') * 16;
    val += message[i+1] > 0x39 ? (message[i+1] - 'A' + 10) : (message[i+1] - '0');

    result += val; 
  }
  Serial.println(result);
  return result;
}

void setup() {
  wifisetup();
  displaysetup();
}
 
//=======================================================================
//                    Main Program Loop
//=======================================================================
void loop() {
  if (WiFi.status() == WL_CONNECTED) 
  {
    HTTPClient http; //Object of class HTTPClient
    http.begin("http://40.90.163.184:3000/transaction/2255387803FA41E9F2FD66A16804F6DF965492344E9C8C19AFDFA76C4D470DFD");
    int httpCode = http.GET();

    if (httpCode > 0) 
    {
      digitalWrite(LED_BUILTIN,HIGH);
      digitalWrite(2,LOW);
      const size_t bufferSize = JSON_OBJECT_SIZE(6) + JSON_OBJECT_SIZE(4) + JSON_OBJECT_SIZE(9) + JSON_OBJECT_SIZE(7) + JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(5)+ 370;
      DynamicJsonBuffer jsonBuffer(bufferSize);
      JsonObject& root = jsonBuffer.parseObject(http.getString());
 
      int height = root["meta"]["height"][0]; 
      const char* hash = root["meta"]["hash"]; 
      const char* recipient = root["transaction"]["recipient"]; 
      const char* message = root["transaction"]["message"]["payload"];  
      int mosaic = root["transaction"]["mosaics"][0]["id"][0]; 
      int mosaicamount = root["transaction"]["mosaics"][0]["amount"][0];

      Serial.print("height:");
      Serial.println(height);
      Serial.print("hash:");
      Serial.println(hash);
      Serial.print("Recipient:");
      Serial.println(recipient);
      Serial.print("Message:");
      Serial.println(message);
      Serial.print("mosaic:");
      Serial.println(mosaic);
      Serial.print("amount:");
      Serial.println(mosaicamount);

      displaystring(converttoascii(message));

      Serial.println("Testing:");
      converttoascii(message);
    }
    
    http.end(); //Close connection
  }
  digitalWrite(2,HIGH);
  digitalWrite(LED_BUILTIN,LOW);
  delay(60000);
}
//=========================================================================
 
 
void displaystring(String message) {
  // clear the display
  display.clear();
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 26, message);
  display.display();
}
