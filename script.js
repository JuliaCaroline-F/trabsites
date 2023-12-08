let cidade="";
let estado= "";
let long="";
let lat="";
let end="";
let clima="";
let temp="";
let not="";
document.querySelector("#botaocep").addEventListener("click", async function(e){
    /*criar uma variavel para o cep e colocar o valor da caixacep */

    let cep =document.querySelector("#caixacep").value;
    console.log(cep);
    /*mandar o link pra API e espera uma resposta. O then executa a ação apos a espera ele retorna apromisse, serve pra maipular objeto de uma promisse */
    await fetch(`https://viacep.com.br/ws/${cep}/json/`).then((resp)=>
        /*pegar o resultado da promisse e retorna como objeto json e then pega a info para manipular*/
        resp.json()).then((resp)=>{
            console.log(resp);
            console.log(resp.localidade);
            cidade = resp.localidade;
            console.log(cidade);
            estado = resp.uf;
            console.log(estado);
            end=resp.logradouro + ", " +resp.bairro;
            
           Previsãotempo();
           Noticias();
           Maps();
        })
        document.write(""+cidade+", "+estado+"<br>");
        
        document.write(""+end+"<br><br>");

});

    function Previsãotempo(){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=453520dd2bbd9d80b2908e8f6553cb97&lang=pt_br`).then((resp)=>
            resp.json()).then((prev)=>{
                console.log(prev);
                console.log(prev.main);
                console.log(prev.weather[0].description);
                console.log(prev.coord)
                long = prev.coord.lon;
                lat = prev.coord.lat;
                console.log(long);
                console.log(lat);

                temp= prev.main.temp;
                clima=prev.weather[0].description;
                document.write(""+clima+", ");
                document.write(""+temp+"°c<br>");
                
                    })
    };
    function Noticias(){ 
        fetch(`https://newsapi.org/v2/everything?q=${estado}&language=pt&sortBy=relevancy&apiKey=995dfe65c0484402b6e6c8fcc0d7c65c`).then((resp)=>
            resp.json()).then((resp)=>{
                console.log(resp);
                not=resp;
               document.write(""+not);
            })
        
   };
   function Maps(){ 
    fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${long}&appid=8d540014541ecd29672dd3401dd86b77`).then((resp)=>
        resp.json()).then((resp)=>{
            console.log(resp);
           
        })
    
    };
    