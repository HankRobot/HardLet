int led1 = 2;
char mychar;
long blinkSpeed;
int loopFor;


void setup()
{
    pinMode(led1, OUTPUT);
    Serial.begin(115200);
}

void loop()
{
	while (Serial.available()>0)
	{
        mychar = Serial.read();

        if(mychar == '1')
        {
            digitalWrite(led1, HIGH);
            Serial.println("On");
        }
        if(mychar == '0')
        {   
            digitalWrite(led1,LOW);
            Serial.println("Off");
        }

        Serial.println("Testing");
    }
}
  
void BlinkMyLED(int pinNumber, long _blinkSpeed, int _loopFor)
{
  for(int x = 0; x < _loopFor; x++)
  {
    digitalWrite(pinNumber, HIGH);
    delay(_blinkSpeed);
    digitalWrite(pinNumber, LOW);
    delay(_blinkSpeed);
  }
}