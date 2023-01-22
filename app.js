const express=require("express");
const bodyParser=require("body-parser");
const peticionHTTPS=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("Public"));

// metodo 'get', cuando accedes a ese recurso del servidor '/'
app.get("/", function(request, response){
    response.sendFile(__dirname + "/signup.html");  
});

// metodo 'post', cuando mandas una informacion a ese recurso del servidor '/'
app.post("/", function(request,response){

    var data={
        members:[
            {
                email_address: request.body.emailName,
                status: "subscribed",
                merge_fields: {
                    FNAME: request.body.firstName,
                    LNAME: request.body.lastName
                }
            }
        ]
    }

    // d37ad4662b <- id de la lista
    // cded6add291dc4c3263d63910e164208-us21  <- API key 
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/d37ad4662b";
    const options={
        method:"POST",
        auth: "mazinho:cded6add291dc4c3263d63910e164208-us21"
    }

    const request_temp = peticionHTTPS.request(url, options, function(res){

        if(res.statusCode===200){
            response.sendFile(__dirname + "/success.html");  
        }else{
            response.sendFile(__dirname + "/failure.html");  
        }

        // res.on("data",function(data){
        //     // console.log(JSON.parse(data));
        // })
    })

    request_temp.write(jsonData);
    request_temp.end();
})



// app.listen(3000,function() {
//     console.log("Servidor escuchando en el puerto 3000");
// })


app.listen(process.env.PORT || 3000,function() {
    console.log("Servidor escuchando en el puerto 3000, o otro que diga la maquina.");
})
