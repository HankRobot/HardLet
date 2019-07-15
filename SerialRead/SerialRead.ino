String mychar;
int led1 =2;

void setup()
{
    pinMode(led1, OUTPUT);
    Serial.begin(115200);
}

void loop()
{
	while (Serial.available()>0)
	{
    mychar = Serial.readString();

    if(mychar == "123456")
    {
      digitalWrite(led1, HIGH);
      Serial.println("On");
    }
    if(mychar == "0")
    {   
      digitalWrite(led1,LOW);
      Serial.println("Off");
    }

    Serial.println(mychar);
  }
}