//https://www.eclipse.org/paho/clients/js/

var btn=document.getElementById('btn'), contador=0;
function PRENDIDO() {
	
	if (contador==0)
	{
	//alert("led on");
	//console.log("ENCENDIDO");
	//document.getElementById("sensor").innerHTML="led on";
	message = new Paho.MQTT.Message("ENCENDER");
        message.destinationName = "maribel.agudelo@unach.edu.ec/tema2";
	client.send(message);
	contador=1;
        } 
        else
	{
	message = new Paho.MQTT.Message("APAGADO");
        message.destinationName = "maribel.agudelo@unach.edu.ec/tema2";
        client.send(message);
	contador=0
	}
}
//function LED1_Off(){	
	//alert("led off");
	//console.log("led off");
	//document.getElementById("sensor").innerHTML="led off";
        //message = new Paho.MQTT.Message("OFF");
        //message.destinationName = "maribel.agudelo@unach.edu.ec/tema2";
        //client.send(message);
//}


// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = conexión_perdida;
  client.onMessageArrived = mensaje_recibido;
  var options = {
   useSSL: false,
    userName: "maribel.agudelo@unach.edu.ec",
    password: "Saltarina1907981",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("maribel.agudelo@unach.edu.ec/tema1");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "maribel.agudelo@unach.edu.ec/tema2";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("conexion_perdida:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("mensaje_recibido:"+message.payloadString);
	  document.getElementById("sensor").innerHTML= message.payloadString;
  }
  
