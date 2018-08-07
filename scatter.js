//acquiring file system
var fs = require('fs');

//acquiring readline
var readline = require('readline');


//acquiring plotly
var username = 'username';
var api_key = 'api_key';
var plotly = require('plotly')(username, api_key);


//Reading the CSV file
var instream = fs.createReadStream('flower.csv');

var index = 0;


//sentosa classification
var sep_len_setosa = [];
var sep_wid_setosa = [];
var pet_len_setosa = [];
var pet_wid_setosa = [];

//versicolor classification 
var sep_len_versicolor = [];
var sep_wid_versicolor = [];
var pet_len_versicolor = [];
var pet_wid_versicolor = [];

//virginica classification
var sep_len_virginica = [];
var sep_wid_virginica = [];
var pet_len_virginica = [];
var pet_wid_virginica = [];


//Creating interferance for input and output
var rl = readline.createInterface(
{
    input: instream
});


function scatter_plot(wid_setosa,len_setosa,wid_versicolor,len_versicolor,wid_virginica,len_virginica,layout_x,layout_y,filename)
{
  var setosa = 
  {
    x: wid_setosa,
    y: len_setosa,
    mode : "markers",
    name : "setosa",
    marker : 
    {
      color : "black",
      size : 12
    },
    type: "scatter"
  };
  var versicolor = 
  {
    x: wid_versicolor,
    y: len_versicolor,
    mode:"markers",
    name:"versicolor",
    marker : 
    {
      color : "red",
      size : 12 
    },
    type: "scatter"
  };
  var virginica = 
  {
    x: wid_virginica,
    y: len_virginica,
    mode:"markers",
    name:"virginica",
    marker : 
    {
      color : "green",
      size :12
    },
    type: "scatter"
  };

  var  layout = 
  {
    title : `scattar plot for IRIS flower ${filename}`,
    xaxis : {title : layout_x},
    yaxis : {title : layout_y}
  };
var data = [setosa, versicolor,virginica];
var graphOptions = {layout : layout, filename: `${filename}`, fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
}



//Reading Streaming line one by one
rl.on('line', function(line)
{
   //str = line;
   var arr = line.split(",").map(function (val) { return val; });
   if(index>0)
   {
    if (arr[4]=='setosa')
    {
      sep_len_setosa.push(arr[0]);
      sep_wid_setosa.push(arr[1]);
      pet_len_setosa.push(arr[2]);
      pet_wid_setosa.push(arr[3]);
    }
    else if (arr[4]=='versicolor')
    {
      sep_len_versicolor.push(arr[0]);
      sep_wid_versicolor.push(arr[1]);
      pet_len_versicolor.push(arr[2]);
      pet_wid_versicolor.push(arr[3]);
    }

    else if(arr[4]=='virginica')
    {
      sep_len_virginica.push(arr[0]);
      sep_wid_virginica.push(arr[1]);
      pet_len_virginica.push(arr[2]);
      pet_wid_virginica.push(arr[3]);
    }
   }
   index++;
});


//After the line is stream ,end computation is performed
rl.on('close',function()
{
 //sepal width versus sepal length 
 scatter_plot(sep_wid_setosa,sep_len_setosa,sep_wid_versicolor,sep_len_versicolor,sep_wid_virginica,sep_len_virginica,"sepal_width","sepal_length","sepal_width_VS_sepal_length");

 //petal length versus sepal length
 scatter_plot(pet_len_setosa,sep_len_setosa,pet_len_versicolor,sep_len_versicolor,pet_len_virginica,sep_len_virginica,"petal_length","sepal_length","petal_length_VS_sepal_length");

 //petal width versus sepal length
 scatter_plot(pet_wid_setosa,sep_len_setosa,pet_wid_versicolor,sep_len_versicolor,pet_wid_virginica,sep_len_virginica,"petal_width","sepal_length","petal_width_VS_sepal_length");

 // sepal length versus sepal width
 scatter_plot(sep_len_setosa,sep_wid_setosa,sep_len_versicolor,sep_wid_versicolor,sep_len_virginica,sep_wid_virginica,"sepal_length","sepal_width","sepal_length_VS_sepal_width");

 // petal length versus sepal width
 scatter_plot(pet_len_setosa,sep_wid_setosa,pet_len_versicolor,sep_wid_versicolor,pet_len_virginica,sep_wid_virginica,"petal_length","sepal_width","petal_length_VS_sepal_width");

 // petal width versus sepal width
 scatter_plot(pet_wid_setosa,sep_wid_setosa,pet_wid_versicolor,sep_wid_versicolor,pet_len_virginica,sep_wid_virginica,"petal_width","sepal_width","petal_width_VS_sepal_width");

 // sepal length versus petal length
 scatter_plot(sep_len_setosa,pet_len_setosa,sep_len_versicolor,pet_len_versicolor,sep_len_virginica,pet_len_virginica,"sepal_length","petal_length","sepal_length_VS_petal_length");

 // petal width versus petal length
 scatter_plot(pet_wid_setosa,pet_len_setosa,pet_wid_versicolor,pet_len_versicolor,pet_wid_virginica,pet_len_virginica,"petal_width","petal_length","petal_width_VS_petal_length");

 // sepal width versus petal length
 scatter_plot(sep_wid_setosa,pet_len_setosa,sep_wid_versicolor,pet_len_versicolor,sep_wid_virginica,pet_len_virginica,"sepal_width","petal_length","sepal_width_VS_petal_length");

 //sepal length versus petal width 
 scatter_plot(sep_len_setosa,pet_wid_setosa,sep_len_versicolor,pet_wid_versicolor,sep_len_virginica,pet_wid_virginica,"sepal_length","petal_width","sepal_length_VS_petal_width");

 //sepal width versus petal width 
 scatter_plot(sep_wid_setosa,pet_wid_setosa,sep_wid_versicolor,pet_wid_versicolor,sep_wid_virginica,pet_wid_virginica,"sepal_width","petal_width","sepal_width_VS_petal_width");

 //petal length versus petal width 
 scatter_plot(pet_len_setosa,pet_wid_setosa,pet_len_versicolor,pet_wid_versicolor,pet_len_virginica,pet_wid_virginica,"petal_length","petal_width","petal_length_VS_petal_width");
 
});
