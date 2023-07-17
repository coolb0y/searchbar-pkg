import React, { useEffect } from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  ReactiveList,
  SingleRange,
  ResultList,
  SelectedFilters

} from "@appbaseio/reactivesearch";
import "./styles.css";

import { useState } from "react";

function App() {
  const [numberOfResult,setNumberOfResult] = useState(6);
  const indexname = process.env.REACT_APP_INDEX_NAME;
  const [fuzzinessval,setFuzzinessval]=useState(2);
  const [queryFormatval,setQueryFormatval]=useState("or");
  const [allMatch, setAllMatch] = useState(false);
  const [phraseMatch, setPhraseMatch] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const [viewCount, setViewCount] = useState(false);
  const [searchText,setSearchText]=useState("");
  useEffect(() => {
   
    if(searchText.trim() !== "" && searchText.length > 0) {
      setViewCount(true);
    }
    else{
      setViewCount(false);
    }
  }, [searchText]);

  

  const handleRangeChange = (event) => {
    const newValue = parseInt(event.target.value);
    setNumberOfResult(newValue);
    // Perform actions with the new value
    console.log("Current value: " + newValue);
  };


  function generateLinkString(url) {
    const parts = url.split('/');
    const domain = parts[2];
    const pathParts = parts.slice(3).map((part) => part.split('.')[0]);
    const formattedURL = `${domain} > ${pathParts.join(' > ')}`;
    return formattedURL;
  }

  const handleAllMatchChange = (event) => {
    setAllMatch(event.target.checked);
   // console.log(allMatch)
    if(allMatch){
     // console.log(allMatch,'All Match fn')
      setFuzzinessval(2);
      setQueryFormatval("or");
    }
    else{
      //console.log(allMatch,'All Match fn1')
        setFuzzinessval(0);
        setQueryFormatval("and");
    }
  };


  const handlePhraseMatchChange = (event) => {
    setPhraseMatch(event.target.checked);
  //  console.log(phraseMatch,'phraseMatch fn')
  
  };


  const customQueryfn = (value, props) => {
    //console.log(value,'value');
    setSearchText(value)
   // console.log(searchText,'searchText')
   // console.log(phraseMatch,'phrase matchoutside')
    
    if (value.trim() !== "") {
      setIsSearchEmpty(false);
      if (phraseMatch) {
       // console.log(phraseMatch,'phrase matchoutside inside')
        // Use the phrase match
        //setFuzzinessval(0);
        //setQueryFormatval("and");
       // console.log("phrase match",phraseMatch)
        return {
          "query": {
            "bool": {
              "should": [
                {
                  "multi_match": {
                    "query": value,
                    "type": "phrase",
                    "fields": [
                      "title^7",
                      "filedetails^4",
                      "artists^3",
                      "album^2",
                      "imgtags^1",
                      "filename^1"
                    ]
                  }
                }
              ]
            }
          },
          "size": 10,
          "_source": {
            "includes": ["*"],
            "excludes": []
          }
        }
        
      }

      else {
        // Use the default query
       // console.log("default query match",phraseMatch)
        return {
          "query": {
            "bool": {
              "must": [
                {
                  "bool": {
                    "should": [
                      {
                        "multi_match": {
                          "query": value,
                          "fields": ["title^7", "filedetails^4", "artists^3", "album^2", "imgtags^1","filename^1"],
                          "type": "best_fields",
                          "operator": queryFormatval,
                          "fuzziness": "AUTO",
                        }
                      },
                      {
                        "multi_match": {
                          "query": value,
                          "fields": ["title^7", "filedetails^4", "artists^3", "album^2", "imgtags^1","filename^1"],
                          "type": "phrase",
                          "operator": queryFormatval
                        }
                      },
                      {
                        "multi_match": {
                          "query": value,
                          "fields": ["title^7", "filedetails^4", "artists^3", "album^2", "imgtags^1","filename^1"],
                          "type": "phrase_prefix",
                          "operator": queryFormatval
                        }
                      }
                    ],
                    "minimum_should_match": 0
                  }
                }
              ]
            }
          },
          "size": 6,
          "_source": {
            "includes": ["*"],
            "excludes": []
          }
        }
        
      }
    }
    return null;
  };

  return (

   
    <div style={{textAlign:"left",marginTop:"0px",marginBottom:'0' ,display:"block" } }>
    
    
  
    <ReactiveBase
      url="http://admin:admin@127.0.0.1:9200"
      app={indexname?indexname:"chipsterindex"}
      credentials="admin:admin"
      enableAppbase={false}
      
     
      // headers={{
			// 	Authorization:  btoa('readall:Total123@') // Replace with your username and password
			// }}
    >
      {/* other components will go here. */}
     
      <div style={{ display: "flex", flexDirection: "row" }}>
     
          <div
      style={{
        display: "block",
        flexDirection: "column",
        width: "30%",
        margin: "15px",
        maxHeight: '700px',
        maxWidth: '350px',
        marginTop: '30px',
        paddingRight: '15px',
      }}
    >   
      <img
        src={process.env.PUBLIC_URL + '/images/SearchPageLogo.png'}
        alt="Chipster"
        style={{
          width: "100%",
          maxWidth: "350px",
          height: "auto",
        
          paddingBottom: "30px",
        }}
      />
         <div>

       
          <MultiList
            showSearch={true}
            componentId="filetypefilter"
            dataField="filetype"
            title="Filter by File Type"
            showCount={viewCount}
            size={4}
            react={{
              and: ["searchbox", "sizefilter","baseurlfilter","filetypefilter"]
            }}
          />

          <MultiList
            showSearch={true}
            componentId="baseurlfilter"
            dataField="baseurl"
            title="Filter by Website"
            fielddata={true}
            size={4}
            showCount={viewCount}
           
            react={{
              and: ["searchbox", "sizefilter","baseurlfilter","filetypefilter"]
            }}
          />
       

          <label for="points" style={{fontWeight: "bold"}}>Result Number on Page</label>
          <input type="range" id="points" name="points" min="2" max="20" value={numberOfResult} onChange={handleRangeChange} />
          <SingleRange
            componentId="sizefilter"
            dataField="filesize"
            title="Filter by File Size"
            react={{
              and: ["searchbox", "sizefilter","baseurlfilter","filetypefilter"]
            }}
            data={[
              { start: 1000000, end: 2000000, label: "1Mb to 2Mb" },
              { start: 2000001, end: 5000000, label: "2Mb to 5Mb" },
              { start: 5000001, end: 10000000, label: "5Mb to 10Mb" },
              { start: 10000001, end: 5000000000, label: "Bigger than 10Mb" },
              
            ]}
            defaultValue=""
          />
 
         </div>
         
         </div>
        
         <div style={{ display: "flex", flexDirection: "column", width: "66%",minWidth:"66%" }}>
          <DataSearch
            style={{
              marginTop: "35px",
              boxShadow: "none",
              
            }}
           showClear={true}
           debounce={500}
           showVoiceSearch={true}
           customQuery={customQueryfn}
            fuzziness={fuzzinessval}
            queryFormat={queryFormatval}
            //autosuggest={false}
            componentId="searchbox"
            dataField={[
              "title",
              //"title.autosuggest",
              "filedetails",
              // "fileDetails.autosuggest"
              "artists",
              "album",
              "imgtags",
              "filename"
            ]}
            react={{
              and: ["searchbox", "sizefilter","baseurlfilter","filetypefilter"]
            }}
            fieldWeights={[7, 4, 3,2,1 ]}
            placeholder="Search.."
           />



            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={allMatch}
                  style={{ width: "19px", height: "19px", marginLeft: "10px", marginRight: "5px" }}
                  onChange={handleAllMatchChange}
                />
                <label htmlFor="allMatch" style={{ marginBottom: "2px", marginRight: "10px" }}>Match All Terms</label>

                <input
                  type="checkbox"
                  checked={phraseMatch}
                  style={{ width: "19px", height: "19px", marginLeft: "1px", marginRight: "5px" }}
                  onChange={handlePhraseMatchChange}
                />

                <label htmlFor="phraseMatch" style={{ marginBottom: "2px" }}>Match Full Phrase</label>
              </div>

              <div>
                <a href="www.google.com" style={{ textDecoration: "none", color: "#3ea9e6", marginRight: "10px" }}><h5 style={{ display: "inline" }}>Search Help</h5></a>
                <a href="www.google.com" style={{ textDecoration: "none", color: "#3ea9e6" }}><h5 style={{ display: "inline",marginRight:"15px" }}>Advanced Search</h5></a>
              </div>
            </div>

            <SelectedFilters showClearAll={true} clearAllLabel="Clear filters" />

           <ReactiveList
          //  showResultStats={false}
          
          onQueryChange={
            function(prevQuery, nextQuery) {
              if ('match_all' in nextQuery['query']) {
                setIsSearchEmpty(true);
                
                nextQuery['query'] = { match_none: {} }
              }
            }
          }
          renderNoResults={() => {
            if (isSearchEmpty) {
              return (
                <div style={{ paddingLeft: "10px" }}>
                  <h3>Please type in the search bar to search</h3>
                </div>
              );
            } else {
              return (
                <div style={{ paddingLeft: "10px", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans,Helvetica Neue, sans-serif" }}>
                  <h4>No Results Found</h4>
                  <p>Sorry, we couldn't find any results for your search query.</p>
                </div>
              );
            }
          }}
            componentId="results"
            dataField="title"
            size={numberOfResult}
            pagination={true}
            react={{
              and: ["searchbox", "sizefilter","baseurlfilter","filetypefilter"]
            }}
            style={{ textAlign: "left" }}
            render={({ data }) =>
            { //console.log(data)
           return (
              
              <ReactiveList.ResultListWrapper>
                {data.map((item) => {

                  let urlnew=generateLinkString(item.url)
                  //console.log(urlnew,'urlnew');

                  //console.log(item)
                  if (item.filetype === "image") {
                    console.log(item)
                    return (
                      // <ReactiveList.ResultCardsWrapper key={item._id}>
                      //   <ResultCard>
                      //     <ResultCard.Image
                      //       src={item.url}
                           
                      //     />
                      //     <ResultCard.Title
                      //       dangerouslySetInnerHTML={{
                      //         __html: item.tags
                      //       }}
                      //     />
                      //   </ResultCard>
                      // </ReactiveList.ResultCardsWrapper>
                      <div style={{ display: "flex", borderRadius: "8px", borderBottom: "1px solid #efefef", marginLeft: "10px", padding: "5px" }}>
                        <a href={item.url} style={{display: "flex", borderRadius: "8px",textDecoration: "none", color:"#424242"}}>
                      <img src={item.url} style={{ width: "15rem", height: "15rem", objectFit: "cover", borderRadius: "8px" }} />
                      <div style={{ marginLeft: "10px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <h4 style={{ marginRight: "5px" }}>Image Base Url:</h4>
                          <p>{item.baseurl}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <h4 style={{ marginRight: "5px" }}>File Name:</h4>
                          <p>{item.filename?item.filename:"No Information Available"}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <h4 style={{ marginRight: "5px" }}>File Size:</h4>
                          <p>{item.filesize?item.filesize/1000 +"KB":"No Information Available"}</p>
                        </div>
                      </div>
                      </a>
                    </div>
                    
                          
                    );
                  }
                else{
                return  (
                  
                    <ResultList key={item._id}>
                      
                      {/* <ResultList.Image
                        style={{
                          backgroundSize: "cover",
                          backgroundImage: `url(${item.image})`
                        }}
                      /> */}
                       <ResultList.Content>
                        <a href={item.url} style={{ textDecoration: "none", color: "#3ea9e6" }}>
                      
                      <ResultList.Title
                      style={{ textDecoration: "none", color: "#3ea9e6" }}
                        dangerouslySetInnerHTML={{
                          __html: item.title?item.title:"No Title Found"
                        }}
                      />
                      <p style={{textDecoration:"none", color:"#989898",fontWeight: "bold"}}>{urlnew}</p>
                      </a>
                      <ResultList.Description>
                        {item.filedetails.substring(0, 250)}
                      </ResultList.Description>
                      </ResultList.Content>
                    </ResultList>
                  )
                }
               })}
              </ReactiveList.ResultListWrapper>
            )}}
          />
        </div>
      </div>
    </ReactiveBase>
    </div>
  );
}

export default App;
