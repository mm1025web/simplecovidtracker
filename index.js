$(document).ready(function(){
    var url = "http://api.covid19india.org/data.json";
    $.getJSON(url,function(data){
        var total,total_recovered,total_deaths,active,newcases,newdeaths,lastupdated;
        
        var state = [];
        var confirmed = [];
        var recovered = [];
        var deaths = [];

        $.each(data.statewise,function(id,obj){
            state.push(obj.state);
            confirmed.push(obj.confirmed);
            recovered.push(obj.recovered);
            deaths.push(obj.deaths);
        })

        state.shift();
        confirmed.shift();
        recovered.shift();
        deaths.shift();

        total = data.statewise[0].confirmed;
        active = data.statewise[0].active;
        total_recovered = data.statewise[0].recovered;
        total_deaths = data.statewise[0].deaths;
        newcases = data.statewise[0].deltaconfirmed;
        newdeaths = data.statewise[0].deltadeaths;
        lastupdated = data.statewise[0].lastupdatedtime;

        $("#total").append(total);
        $("#recovered").append(total_recovered);
        $("#active").append(active);
        $("#deaths").append(total_deaths);
        $("#newcases").append(newcases);
        $("#newdeaths").append(newdeaths);
        $("#lastupdated").append(lastupdated)
        
        var myChart = document.getElementById("myChart").getContext("2d");

        var chart = new Chart(myChart, {
            type: "line",
            data:{
                labels: state,
                datasets: [
                    {
                        label: "Confirmed Cases",
                        data: confirmed,
                        backgroundColor: "#f1c40f",
                        minBarLength:100,
                    },
                    {
                        label: "Recovered Cases",
                        data: recovered,
                        backgroundColor: "#2ecc71",
                        minBarLength:100,
                    },
                    {
                        label: "Deceased",
                        data: deaths,
                        backgroundColor: "#e74c3c",
                        minBarLength:100,
                    },
                ]
            },
            options:{}
        })
    })
})


/*

        var state = [];
        var confirmed = [];
        var recovered = [];
        var deaths = [];

        $.each(data.statewise,function(id,obj){
            state.push(obj.state);
            confirmed.push(obj.confirmed);
            recovered.push(obj.recovered);
            deaths.push(obj.deaths);

        })

        state.shift();
        confirmed.shift();
        recovered.shift();
        deaths.shift();

        var myChart = document.getElementById("myChart").getContext('2d');

        var chart = new Chart(myChart,{
            type:'line',
            data:{
                labels:state,
                datasets:[
                    {
                    label:"Confirmed Cases",
                    data:confirmedcases;
                    backgroundColor: "#f1c40f",
                    minBarLength:100
                   },
                   {
                    label:"Recovered Cases",
                    data:recoveredcases;
                    backgroundColor: "#2ecc71",
                    minBarLength:100
                   },
                   {
                    label:"Deaths",
                    data:tdeaths;
                    backgroundColor: "#e74c3c",
                    minBarLength:100
                   },
                ],
        },
        options:{},
      });
    });
*/