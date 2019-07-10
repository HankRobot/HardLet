/* 
 * https://circuits4you.com
 * ESP8266 NodeMCU Oled Display Code Example
 * 
 */
 
#include <ESP8266WiFi.h>
#include <Wire.h>  // Only needed for Arduino 1.6.5 and earlier
#include "SSD1306Wire.h" // legacy include: `#include "SSD1306.h"`
 
 
// Initialize the OLED display using Wire library
SSD1306Wire  display(0x3c, D2, D1);  //D2=SDK  D1=SCK  As per labeling on NodeMCU
 
//=======================================================================
//                    Power on setup
//=======================================================================
 
void setup() {
  delay(1000);
  Serial.begin(115200);  
  Serial.println("");
  
  Serial.println("Initializing OLED Display");
  display.init();
 
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
}
 
//=======================================================================
//                    Main Program Loop
//=======================================================================
void loop() {
  drawFontFaceDemo();
  delay(1000);
  drawRectDemo();
  delay(1000);
  void drawCircleDemo();
  delay(1000);
}
//=========================================================================
 
 
void drawFontFaceDemo() {
  // clear the display
  display.clear();
    // Font Demo1
    // create more fonts at http://oleddisplay.squix.ch/
    display.setTextAlignment(TEXT_ALIGN_LEFT);
    display.setFont(ArialMT_Plain_10);
    display.drawString(0, 0, "Hello world");
    display.setFont(ArialMT_Plain_16);
    display.drawString(0, 10, "Hello world");
    display.setFont(ArialMT_Plain_24);
    display.drawString(0, 26, "Hello world");
  // write the buffer to the display
  display.display();
}
 
void drawRectDemo() {
  // clear the display
  display.clear();
      // Draw a pixel at given position
    for (int i = 0; i < 10; i++) {
      display.setPixel(i, i);
      display.setPixel(10 - i, i);
    }
    display.drawRect(12, 12, 20, 20);
 
    // Fill the rectangle
    display.fillRect(14, 14, 17, 17);
 
    // Draw a line horizontally
    display.drawHorizontalLine(0, 40, 20);
 
    // Draw a line horizontally
    display.drawVerticalLine(40, 0, 20);
   // write the buffer to the display
  display.display();
}
 
void drawCircleDemo() {
  // clear the display
  display.clear();
  
  for (int i=1; i < 8; i++) {
    display.setColor(WHITE);
    display.drawCircle(32, 32, i*3);
    if (i % 2 == 0) {
      display.setColor(BLACK);
    }
    display.fillCircle(96, 32, 32 - i* 3);
  }
 
  // write the buffer to the display
  display.display();
}
