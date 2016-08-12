//------------importing fs and readline modules---------------------------------------
const reader=require('readline');
var fs=require('fs');

//--------------declaring required variables-------------------------------------------
var i=0;
var header=[];
var obArr=[];
var area_obArr=[];
var countryIndex,sugarIndex,saltIndex;

//------------------------Initializing countries array for the first solution-----------
var countries=["Netherlands","Canada","Australia","France","Germany","Spain","South Africa","United States","United Kingdom"];

//-------------Initializing area wise countries of Europe for second solution------------
var north_europe=["United Kingdom","Denmark","Sweden","Norway"];
var central_europe=["France","Belgium","Germany","Switzerland","Netherlands"];
var south_europe=["Portugal","Greece","Italy","Spain","Croatia","Albania"];

//-------------------------Reading file contents-----------------------------------------
var readerStream=fs.createReadStream('../FoodFacts.csv');
readerStream.setEncoding('UTF8');

//-------------------------Using readline constant to read the file line by line----------
var lineReader=reader.createInterface({
  input:readerStream
});

//------------------------declaring variable to write inside the JSON file-----------------
var output=fs.createWriteStream('../countryConsumption.json');
output.readable=true;
output.writable=true;

var output2=fs.createWriteStream('../europeCountryConsumption.json');
output.readable=true;
output.writable=true;

//------------------calling callback when lineReader starts reading file line by line--------
lineReader.on('line',function(line)
{
  if(i==0) //when row-0(heading of the contents) encountered.
  {
    header=line.split(","); //Split line on the basis of ","
    countryIndex=header.indexOf("countries"); //Store the countries index.
    sugarIndex=header.indexOf("sugars_100g"); //Store the sugars_100g index.
    saltIndex=header.indexOf("salt_100g"); //Store the salt_100g index.
    fatIndex=header.indexOf("fat_100g");
    proteinIndex=header.indexOf("proteins_100g");
    carboIndex=header.indexOf("carbohydrates_100g");
    i++; //Increment row of the file.
  }
  else
  {
    var lineInfo=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); //Split file on the basis of regular expressions.
    var restOftheLines=[];

    lineInfo.forEach(function(string)
    {
     restOftheLines.push(string.replace(/['"]+/g, ''));
    });

//----------Storing required countries and their sugar and salt consumption in object array---------
    for(var j=0;j<countries.length;j++)
    {
      if(restOftheLines[countryIndex]===countries[j])
      {
        if(restOftheLines[sugarIndex]==""||restOftheLines[saltIndex]=="")
        {
          restOftheLines[sugarIndex]=0.0;
          restOftheLines[saltIndex]=0.0;
        }
        if(typeof restOftheLines[sugarIndex]=="string"|| typeof restOftheLines[saltIndex]=="string")
        {
          restOftheLines[sugarIndex]=parseFloat(restOftheLines[sugarIndex]);
          restOftheLines[saltIndex]=parseFloat(restOftheLines[saltIndex]);
        }
        var object={};
        object["Country"]=restOftheLines[countryIndex];
        object["SugarConsumption"]=restOftheLines[sugarIndex];
        object["SaltConsumption"]=restOftheLines[saltIndex];
        obArr.push(object);
      }
    }

//---------Storing north european details with fat,protein,carbohydrate consumption in area_obArr array-------------------
    for(var j=0;j<north_europe.length;j++)
    {
      if(restOftheLines[countryIndex]===north_europe[j])
      {
        if(restOftheLines[fatIndex]==""||restOftheLines[carboIndex]==""||restOftheLines[proteinIndex]=="")
        {
          restOftheLines[fatIndex]=0.0;
          restOftheLines[carboIndex]=0.0;
          restOftheLines[proteinIndex]=0.0;
        }
        if(typeof restOftheLines[fatIndex]=="string"|| typeof restOftheLines[carboIndex]=="string"||typeof restOftheLines[proteinIndex]=="string")
        {
          restOftheLines[fatIndex]=parseFloat(restOftheLines[fatIndex]);
          restOftheLines[carboIndex]=parseFloat(restOftheLines[carboIndex]);
          restOftheLines[proteinIndex]=parseFloat(restOftheLines[proteinIndex]);
        }
        var object={};
        object["Country"]=restOftheLines[countryIndex];
        object["FatConsumption"]=restOftheLines[fatIndex];
        object["CarboConsumption"]=restOftheLines[carboIndex];
        object["ProteinConsumption"]=restOftheLines[proteinIndex];
        area_obArr.push(object);
      }
    }

//---------Storing central european details with fat,protein,carbohydrate consumption in area_obArr array-------------------
    for(var j=0;j<central_europe.length;j++)
    {
      if(restOftheLines[countryIndex]===central_europe[j])
      {
        if(restOftheLines[fatIndex]==""||restOftheLines[carboIndex]==""||restOftheLines[proteinIndex]=="")
        {
          restOftheLines[fatIndex]=0.0;
          restOftheLines[carboIndex]=0.0;
          restOftheLines[proteinIndex]=0.0;
        }
        if(typeof restOftheLines[fatIndex]=="string"|| typeof restOftheLines[carboIndex]=="string"||typeof restOftheLines[proteinIndex]=="string")
        {
          restOftheLines[fatIndex]=parseFloat(restOftheLines[fatIndex]);
          restOftheLines[carboIndex]=parseFloat(restOftheLines[carboIndex]);
          restOftheLines[proteinIndex]=parseFloat(restOftheLines[proteinIndex]);
        }
        var object={};
        object["Country"]=restOftheLines[countryIndex];
        object["FatConsumption"]=restOftheLines[fatIndex];
        object["CarboConsumption"]=restOftheLines[carboIndex];
        object["ProteinConsumption"]=restOftheLines[proteinIndex];
        area_obArr.push(object);
      }
    }

//---------Storing south european details with fat,protein,carbohydrate consumption in area_obArr array-------------------
    for(var j=0;j<south_europe.length;j++)
    {
      if(restOftheLines[countryIndex]===south_europe[j])
      {
        if(restOftheLines[fatIndex]==""||restOftheLines[carboIndex]==""||restOftheLines[proteinIndex]=="")
        {
          restOftheLines[fatIndex]=0.0;
          restOftheLines[carboIndex]=0.0;
          restOftheLines[proteinIndex]=0.0;
        }
        if(typeof restOftheLines[fatIndex]=="string"|| typeof restOftheLines[carboIndex]=="string"||typeof restOftheLines[proteinIndex]=="string")
        {
          restOftheLines[fatIndex]=parseFloat(restOftheLines[fatIndex]);
          restOftheLines[carboIndex]=parseFloat(restOftheLines[carboIndex]);
          restOftheLines[proteinIndex]=parseFloat(restOftheLines[proteinIndex]);
        }
        var object={};
        object["Country"]=restOftheLines[countryIndex];
        object["FatConsumption"]=restOftheLines[fatIndex];
        object["CarboConsumption"]=restOftheLines[carboIndex];
        object["ProteinConsumption"]=restOftheLines[proteinIndex];
        area_obArr.push(object);
      }
    }
  }
});

//-----------When the line reading operation is finished--------------------------------------------
lineReader.on('close',function(){
  //console.log(JSON.stringify(area_obArr));
  var k=1;
  var countryFromSource=[]; //Creating array of countries to map with the countries array.
  var countryConsumption=[]; //Creating final object array.
  var europe_Countries=[];//Creating array to store countries of Europe.
  var europeCountryConsumption=[];
  var europeArea=["North Europe","Central Europe","South Europe"];
  var finalAreaConsumption=[];

//-----------Storing the countries in a separate array-------------------------------------
  for(i=0;i<obArr.length;i++)
  {
    countryFromSource.push(obArr[i]["Country"]);
  }

//Forming the final object array containing distinct countries with salt and sugar consumption.
  for(i=0;i<countries.length;i++)
  {
    var j=-1;
    var sugarCon=0;
    var saltCon=0;
    while((j = countryFromSource.indexOf(countries[i], j + 1)) !== -1)
    {
      sugarCon += obArr[j]["SugarConsumption"];
      saltCon += obArr[j]["SaltConsumption"];
    }
    var obj={};
    obj["Country"]=countries[i];
    obj["SugarConsumption"]=sugarCon;
    obj["SaltConsumption"]=saltCon;
    countryConsumption.push(obj);
  }

//---------------Storing european countries in a separate array-----------------------------------------
  for(i=0;i<area_obArr.length;i++)
  {
    europe_Countries.push(area_obArr[i]["Country"]);
  }

//-------------Filtering european country details with fat,carbohydrate and protein consumption--------
  for(i=0;i<north_europe.length;i++)
  {
    var j=-1;
    var fatCon=0;
    var carboCon=0;
    var proteinCon=0;
    while((j = europe_Countries.indexOf(north_europe[i], j + 1)) !== -1)
    {
      fatCon += area_obArr[j]["FatConsumption"];
      carboCon += area_obArr[j]["CarboConsumption"];
      proteinCon += area_obArr[j]["ProteinConsumption"];
    }
    var obj={};
    obj["Country"]=north_europe[i];
    obj["FatConsumption"]=fatCon;
    obj["CarboConsumption"]=carboCon;
    obj["ProteinConsumption"]=proteinCon;
    europeCountryConsumption.push(obj);
  }
  for(i=0;i<central_europe.length;i++)
  {
    var j=-1;
    var fatCon=0;
    var proteinCon=0;
    var carboCon=0;
    while((j = europe_Countries.indexOf(central_europe[i], j + 1)) !== -1)
    {
      fatCon += area_obArr[j]["FatConsumption"];
      carboCon += area_obArr[j]["CarboConsumption"];
      proteinCon += area_obArr[j]["ProteinConsumption"];
    }
    var obj={};
    obj["Country"]=central_europe[i];
    obj["FatConsumption"]=fatCon;
    obj["CarboConsumption"]=carboCon;
    obj["ProteinConsumption"]=proteinCon;
    europeCountryConsumption.push(obj);
  }
  for(i=0;i<south_europe.length;i++)
  {
    var j=-1;
    var fatCon=0;
    var proteinCon=0;
    var carboCon=0;
    while((j = europe_Countries.indexOf(south_europe[i], j + 1)) !== -1)
    {
      fatCon += area_obArr[j]["FatConsumption"];
      carboCon += area_obArr[j]["CarboConsumption"];
      proteinCon += area_obArr[j]["ProteinConsumption"];
    }
    var obj={};
    obj["Country"]=south_europe[i];
    obj["FatConsumption"]=fatCon;
    obj["CarboConsumption"]=carboCon;
    obj["ProteinConsumption"]=proteinCon;
    europeCountryConsumption.push(obj);
  }

  //------------------------------Storing north europian details in an array--------------------
  europe_Countries=[];
  for(i=0;i<north_europe.length;i++)
  {
    europe_Countries.push(europeCountryConsumption[i]);
  }
  obj={};
  obj[europeArea[0]]=europe_Countries;
  finalAreaConsumption.push(obj); //Pushing the north european details under North Europe key of finalAreaConsumption object array.

  //------------------------------Storing central europian details in an array--------------------
  europe_Countries=[];
  for(i=north_europe.length;i<(north_europe.length+central_europe.length);i++)
  {
    europe_Countries.push(europeCountryConsumption[i]);
  }
  obj={};
  obj[europeArea[1]]=europe_Countries;
  finalAreaConsumption.push(obj); //Pushing the central european details under Central Europe key of finalAreaConsumption object array.

    //------------------------------Storing south europian details in an array--------------------
  europe_Countries=[];
  for(i=(north_europe.length+central_europe.length);i<(north_europe.length+central_europe.length+south_europe.length);i++)
  {
    europe_Countries.push(europeCountryConsumption[i]);
  }
  obj={};
  obj[europeArea[2]]=europe_Countries;
  finalAreaConsumption.push(obj); //Pushing the south european details under South Europe key of finalAreaConsumption object array.

//--------------Writing final object array in JSON format with .json extension------------------
  output.write(JSON.stringify(countryConsumption));
  console.log("Writing file for sugar and salt consumption completed...");
  output2.write(JSON.stringify(finalAreaConsumption));
  console.log("Writing file for European areas for fat,carbohydrate and protein completed...");
});

console.log("Reading Line...");
