/*
JavsScript
*/
  // creamos un objeto de firebase, y le pasamos la URL como parametro
  var ref = new Firebase("https://proyectorpi.firebaseio.com/");

  // Traemos el valor de los sensores
  ref.once("value", function(res) {

    var sensorGas = res.child("sensor/gas");
    var valorSensorGas = sensorGas.val()
    $('#gas').text(valorSensorTemp);

    var sensorAmmonia = res.child("sensor/ammonia");
    var valorSensorAmmonia = sensorAmmonia.val()
    $('#ammonia').text(valorSensorAmmonia);
	
	var dust = res.child("sensor/dust");
    var valordust = dust.val()
    $('#dust').text(valordust);

    // llamamos, la funcion cambiarImagen.
    cambiarImagen(valorSensorGas,valorSensorAmmonia,valordust)

  });

  // Obtenemos el valor de los sensores cada vez que hay un cambio
  // (En tiempo real)
  ref.on("child_changed", function(res) {

    var valorSensorGas = res.val().gas
    $('#gas').text(valorSensorGas);

    var valorSensorAmmonia = res.val().ammonia
    $('#ammonia').text(valorSensorAmmonia);
	
	var valordust = res.val().dust
    $('#dust').text(valordust);

    cambiarImagen(valorSensorGas,valorSensorAmmonia,valordust)

  });

  /*
    función para cambiar la imagen de fondo
    de acuerdo a los valores de los sensores
  */

  function cambiarImagen(valorSensorGas, valorSensorAmmonia, valordust){

    if(valorSensorGas<=0){

        console.log("Es de dia");

        if(valorSensorGas>0.5 && valorSensorGas<=1){

          /* console.log("dia frio");
          $("#imgagriculture1").siblings().fadeOut(3000);
          $("#imgagriculture1").fadeIn(3000); */
          $("#dia").text("LOW");

        }
        else if(valorSensorGas>1 && valorSensorGas<=2){
          /* console.log("dia fresco");
          $("#imgagriculture2").siblings().fadeOut(3000);
          $("#imgagriculture2").fadeIn(3000) */
          $("#dia").text("MEDIUM");
        }

        else if(valorSensorGas>2){
          /* console.log("dia Calido");
          $("#imgpoll1").siblings().fadeOut(3000);
          $("#imgpoll1").fadeIn(3000); */
          $("#dia").text("HIGH");
        }

    }else{
        /* console.log("Es de noche");
        $("#imgpoll1").siblings().fadeOut(3000);
        $("#imgpoll1").fadeIn(3000); */
        $("#dia").text("NONE");

    }
 }
