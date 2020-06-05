$(document).ready(function(){
    var url = "http://api.covid19india.org/data.json";
    $.getJSON(url,function(data){
        var total,total_recovered,total_deaths,active,newcases,newdeaths,lastupdated;

        /*state.shift();
        confirmed.shift();
        recovered.shift();
        deaths.shift();*/

        total = data.statewise[0].confirmed;
        active = data.statewise[0].active;
        total_recovered = data.statewise[0].recovered;
        total_deaths = data.statewise[0].deaths;
        newcases = data.statewise[0].deltaconfirmed;
        newdeaths = data.statewise[0].deltadeaths;
        lastupdated = data.statewise[0].lastupdatedtime;

        function thousands_separators(num)
        {
            var num_parts = num.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return num_parts.join(".");
        }
        
            total = thousands_separators(total);
            active = thousands_separators(active);
            total_recovered = thousands_separators(total_recovered);    
            total_deaths = thousands_separators(total_deaths);    
            newcases = thousands_separators(newcases);    
            newdeaths = thousands_separators(newdeaths);  
            
        $("#total").append(total);
        $("#recovered").append(total_recovered);
        $("#active").append(active);
        $("#deaths").append(total_deaths);
        $("#newcases").append(newcases);
        $("#newdeaths").append(newdeaths);
        $("#lastupdated").append(lastupdated)
        

        var date = [];
        var confirmed = [];
        var recovered = [];
        var deaths = [];
        var state = [];
        var totalconfirmed = [];
        var totalrecovered = [];
        var totaldeaths = [];

        $.each(data.cases_time_series,function(id,obj){
            confirmed.push(obj.dailyconfirmed);
            date.push(obj.date);
            recovered.push(obj.dailyrecovered);
            deaths.push(obj.dailydeceased);
        })

        $.each(data.statewise,function(id,obj){
            state.push(obj.state);
            totalconfirmed.push(obj.confirmed);
            totalrecovered.push(obj.recovered);
            totaldeaths.push(obj.deaths);

        })

        state.shift();
        totalconfirmed.shift();
        totalrecovered.shift();
        totaldeaths.shift();
        
        var myChart = document.getElementById("myChart").getContext("2d");

        var chart = new Chart(myChart, {
            
            type: "line",
            data:{
                labels: date,
                markerSize:10,
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
            options:{
                scales: {
                    yAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                }
            }
        })

        var myChart2 = document.getElementById("myChart2").getContext("2d");

        var chart = new Chart(myChart2, {
            
            type: "line",
            data:{
                labels: state,
                markerSize:10,
                datasets: [
                    {
                        label: "Confirmed Cases",
                        data: totalconfirmed,
                        backgroundColor: "#f1c40f",
                        minBarLength:100,
                    },
                    {
                        label: "Recovered Cases",
                        data: totalrecovered,
                        backgroundColor: "#2ecc71",
                        minBarLength:100,
                    },
                    {
                        label: "Deceased",
                        data: totaldeaths,
                        backgroundColor: "#e74c3c",
                        minBarLength:100,
                    },
                ]
            },
            options:{
                scales: {
                    yAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                }
            }
        })
    })
    
})

