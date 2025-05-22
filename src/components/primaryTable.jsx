import { useEffect } from "react";
function PrimaryTable({activatedList}){
  const primaryDentition = {
    'lower':{
      'CI':'6-10',
      'LI':'10-16',
      '1M':'14-18',
      'C':'17-23',
      '2M':'23-31'
    },
    'upper':{
      'CI':'8-12',
      'LI':'9-13',
      '1M':'13-19',
      'C':'16-22',
      '2M':'25-33'
    }

  };

  const tableList = {
    'lower':{
      'CI':false,
      'LI':false,
      '1M':false,
      'C':false,
      '2M':false
    },
    'upper':{
      'LI':false,
      'CI':false,
      '1M':false,
      'C':false,
      '2M':false
    }

  };
  //useEffect(()=>{
  
  for(const i of activatedList){
    console.log(`BWAHAHAHA ${i}`)
    if(i === "UpperLeftmolar1" ||i === "UpperRightMolar1" ){
      tableList['upper']['1M'] = true;
    }
    if(i === "UpperLeftmolar2"||i==="UpperLeftmolar3" || i === "UpperRightMolar2"||i==="UpperRightMolar3"){
      tableList['upper']['2M'] = true;
    }
    if(i === "UpperLeftCanine" || i === "UpperRightCanine1"){
      tableList['upper']['C'] = true;
    }
    if(i === "UpperLeftIncisor1" || i === "UpperRightIncisor1"){
      tableList['upper']['LI'] = true;
    }
    if(i === "UpperLeftIncisor2" || i === "UpperRigthIncisor2"){
      tableList['upper']['CI'] = true;
    }
    if(i === "LowerLeftMolar1" || i === "LowerRightMolar1"){
      tableList['lower']['1M'] = true;
    }
    if(i === "LowerLeftMolar2" || i === "LowerLeftMolar3" || i === "LowerRightMolar2" || i === "LowerRightMolar3"){
      tableList['lower']['2M'] = true;
    }
    if(i === "LowerLeftCanine" || i === "LowerRightCanine"){
      tableList['lower']['C'] = true;
    }
    if(i === "LowerLeftIncisor1" || i === "LowerRightIncisor1"){
      tableList['lower']['LI'] = true;
    }
    if(i === "LowerLeftIncisor2" || i === "LowerRightIncisor2"){
      tableList['lower']['CI'] = true;
    }
  }
  useEffect(()=>{console.log(tableList)},[activatedList])
  return(
    <table>
      <tbody>
        <tr>
          <th>Upper-Jaw</th>    
        </tr>
        <tr>
          <th>Teeth</th>
          <th>Eruption Time (in months)</th>
        </tr>
        {Object.keys(tableList['upper']).map((val)=>{
          if(tableList['upper'][val]){
            return (<tr><td>{val}</td><td>{primaryDentition['upper'][val]}</td></tr>);
          }
        })}
        </tbody>
        <tbody>
        <tr>
          <th>Lower-Jaw</th>    
        </tr>
        <tr>
          <th>Teeth</th>
          <th>Eruption Time (in months)</th>
        </tr>
        {Object.keys(tableList['lower']).map((val)=>{
          if(tableList['lower'][val]){
            return (<tr><td>{val}</td><td>{primaryDentition['lower'][val]}</td></tr>);
          }
        })}
      </tbody>
      <tbody>

      </tbody>
    </table>);
}

export {PrimaryTable}