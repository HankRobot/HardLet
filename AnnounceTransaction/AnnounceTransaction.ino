#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "NBC_Guest";
const char* password = "nbc1234!";
char payload[] = "{\"payload\":\"B70000009C0347616C9F3654C4EA98CD5CD74AF683E4CEFD7441A837706466B2D2EE9677A54B632A293E85EC4DFC0818DCAAABE668D3E1B421E27DC620986DDA7553400358908D0758292DBAC944AAE6C76DBB50069C1CC11EC063F1870861DCCD1CA7BC039054410000000000000000E55484061800000090071D6DDEBAF37A9E8A4702B096F8D67E17C724A5BA49021E13000100656E6A6F7920796F7572207469636B657421D787D9329996A1770100000000000000\"}";

void setup()
{
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(1000);
    Serial.println("Connecting...");
  }
  Serial.println("Connected!");
}

void loop() 
{
  if (WiFi.status() == WL_CONNECTED) 
  {
    HTTPClient http; //Object of class HTTPClient
    http.begin("http://40.90.163.184:3000/transaction");
    http.addHeader("Content-Type","application/json");
    
    int httpCode = http.PUT(payload);

    if (httpCode > 0) 
    {
      const size_t bufferSize = JSON_OBJECT_SIZE(7)+370;
      DynamicJsonBuffer jsonBuffer(bufferSize);
      JsonObject& root = jsonBuffer.parseObject(http.getString());
      
      const char* message = root["message"];

      Serial.print("message:");
      Serial.println(message);
    }
    http.end(); //Close connection
  }
  delay(60000);
}
