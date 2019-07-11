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

String lock = "CE674B3EC2645EE7EB65902A6CC4C84BE531F90BA3AFE06E010A74B6E5766D39";

void loop() 
{
  if (WiFi.status() == WL_CONNECTED) 
  {
    HTTPClient http; //Object of class HTTPClient
    http.begin("http://40.90.163.184:3000//account/CE674B3EC2645EE7EB65902A6CC4C84BE531F90BA3AFE06E010A74B6E5766D39/transactions/incoming");
    int httpCode = http.GET();

    if (httpCode > 0) 
    {
      digitalWrite(LED_BUILTIN,HIGH);
      digitalWrite(2,LOW);
      const size_t bufferSize = JSON_OBJECT_SIZE(6) + JSON_OBJECT_SIZE(4) + JSON_OBJECT_SIZE(9) + JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(5)+ 370;
      DynamicJsonBuffer jsonBuffer(bufferSize);
      JsonObject& root = jsonBuffer.parseObject(http.getString());
 
      int height = root[0]["meta"]["height"][0]; 
      const char* hash = root[0]["meta"]["hash"]; 
      const char* recipient = root[0]["transaction"]["recipient"]; 
      int mosaic = root[0]["transaction"]["mosaics"][0]["id"][0]; 
      int mosaicamount = root[0]["transaction"]["mosaics"][0]["amount"][0];

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
