function grab(){
  $("#loading").show();
  $("#loadingCenter").text("Loading Google Sheet...");
  $.ajax({
    url: "https://spreadsheets.google.com/feeds/list/183I5mBeO5hIuPSwy7aEq2wds_yeFRT8kicXpehcktdY/od6/public/values?alt=json",
    type: "GET",
    contentType: "application/json",
    success: function(d){
      
      box=[];
      d.feed.entry.forEach(function(f)
      {
        box.push({"department":f.gsx$department.$t,"description":f.gsx$description.$t,"key":f.gsx$key.$t,"type":f.gsx$type.$t})

      })
       console.log(box);

       box.forEach(function(f){

        if (f.department!="department")
        {
          if(f.type=="o")
          {
            words="<h4>"+f.description+"</h4>"
            words+="<div class='progress-bar-container'>"+f.key+"<div class ='progress'><div data-percentage='50%' style='width: "+(parseFloat(f.key)*100)+"%;' class='progress-bar ";
            if(parseFloat(f.key)<=0.6)
            {
              words+="progress-bar-danger";
            }
            else if (parseFloat(f.key)<=0.7)
            {
              words+="progress-bar-warning";
            }
            else
            {
              words+="progress-bar-success";  
            }


            words+="' role='progressbar' aria-valuemin='0' aria-valuemax='100'></div></div></div>";
            words+="<hr class='bigHR'>"
            document.getElementById(f.department+"-okr").innerHTML+=words;
          }
          else
          {
            
            document.getElementById(f.department+"-okr").innerHTML+="<div class ='progress-bar-title'><div class='progress-bar-text'>"+f.key+"</div></div><div class='key'><h6>"+f.description+"</h6></div>";

          }
        }
        

       });

    },
    error: function(e){
      alert("There was an error loading the Google Sheet.");
     
    },
    dataType: "json"
  });

}