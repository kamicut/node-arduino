int led = 7;
int incomingByte = 0;

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  while (!Serial) {;}
}

void loop() {
  if (Serial.available() > 0) {
    incomingByte = Serial.read();
    // say what you got:
    Serial.print("I received: ");
    Serial.println(incomingByte);
    
    //0 is mapped to 48, this will only accept numbers between 0-9
    incomingByte = incomingByte - 48;
    for (int i=0; i<incomingByte; i++) {
      digitalWrite(led,HIGH);
      delay(200);
      digitalWrite(led,LOW);
      delay(200);
    }
  }
}
