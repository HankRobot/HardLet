#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "NBC_Guest";
const char* password = "nbc1234!";

void setup() 
{
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

char* hash = "2255387803FA41E9F2FD66A16804F6DF965492344E9C8C19AFDFA76C4D470DFD";

void loop() 
{
  if (WiFi.status() == WL_CONNECTED) 
  {
    HTTPClient http; //Object of class HTTPClient
    http.begin("http://40.90.163.184:3000/transaction/"+ hash);
    int httpCode = http.GET();

    if (httpCode > 0) 
    {
      digitalWrite(LED_BUILTIN,HIGH);
      digitalWrite(2,LOW);
      const size_t bufferSize = JSON_OBJECT_SIZE(6) + JSON_OBJECT_SIZE(4) + JSON_OBJECT_SIZE(9) + JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(5)+ 370;
      DynamicJsonBuffer jsonBuffer(bufferSize);
      JsonObject& root = jsonBuffer.parseObject(http.getString());
 
      int height = root["meta"]["height"][0]; 
      const char* hash = root["meta"]["hash"]; 
      const char* recipient = root["transaction"]["recipient"]; 
      int mosaic = root["transaction"]["mosaics"][0]["id"][0]; 
      int mosaicamount = root["transaction"]["mosaics"][0]["amount"][0];

      Serial.print("height:");
      Serial.println(height);
      Serial.print("hash:");
      Serial.println(hash);
      Serial.print("Recipient:");
      Serial.println(recipient);
      Serial.print("mosaic:");
      Serial.println(mosaic);
      Serial.print("amount:");
      Serial.println(mosaicamount);
    }
    
    http.end(); //Close connection
  }
  digitalWrite(2,HIGH);
  digitalWrite(LED_BUILTIN,LOW);
  delay(60000);
  
}
