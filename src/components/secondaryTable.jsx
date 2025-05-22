import { useEffect } from "react";
function SecondaryTable({activatedList}){
    const secondaryDentition = {
      "upper": {
        "CI": "7-8",
        "LI": "8-9",
        "1M": "9-10",
        "1P": "10-11",
        "2P": "10-12",
        "C": "11-12",
        "2M": "12-13",
        "3M": "17-21"
      },
      "lower": {
        "CI": "6-7",
        "1M": "6-7",
        "LI": "7-8",
        "C": "9-10",
        "1P": "10-12",
        "2P": "11-12",
        "2M": "11-13",
        "3M": "17-21"
      }
    }
    
      const tableList = {
        "upper": {
          "CI": false,
          "LI": false,
          "1M": false,
          "1P": false,
          "2P": false,
          "C": false,
          "2M": false,
          "3M": false
        },
        "lower": {
          "CI": false,
          "1M": false,
          "LI": false,
          "C": false,
          "1P": false,
          "2P": false,
          "2M": false,
          "3M": false
        }
      }
      
      //useEffect(()=>{
      
      for(const i of activatedList){
        if(i === "UpperLeftmolar1" ||i === "UpperRightMolar1" ){
          tableList['upper']['1M'] = true;
        }
        if(i === "UpperLeftmolar2" || i === "UpperRightMolar2"){
          tableList['upper']['2M'] = true;
        }
        if(i==="UpperLeftmolar3" || i==="UpperRightMolar3"){
          tableList['upper']['3M'] = true;
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
        if(i === "LowerLeftMolar2" || i === "LowerRightMolar2"){
          tableList['lower']['2M'] = true;
        }
        if(i === "LowerLeftMolar3" || i === "LowerRightMolar3"){
          tableList['lower']['3M'] = true;
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
        if(i==="UpperLeftpremolar1" || i==="UpperRightPremolar1" ){
          tableList['upper']['1P'] = true;
        }
        if(i==="UpperLeftpremolar2" || i === "UpperRightPremolar2"){
          tableList['upper']['2P'] = true;
        }
        if(i === "LowerLeftPremolar1" || i === "LowerRightPreMolar1"){
          tableList['lower']['1P'] = true;
        }
        if(i === "LowerLeftPremolar2" || i === "LowerRightPreMolar2"){
          tableList['lower']['2P'] = true;
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
                return (<tr><td>{val}</td><td>{secondaryDentition['upper'][val]}</td></tr>);
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
                return (<tr><td>{val}</td><td>{secondaryDentition['lower'][val]}</td></tr>);
              }
            })}
          </tbody>
          <tbody>
    
          </tbody>
        </table>);
}
export {SecondaryTable}
