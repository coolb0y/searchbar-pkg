import { useEffect,useState } from "react";
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
import Tab from "./Tab";


function Searchpage() {
  const [numberOfResult,setNumberOfResult] = useState(8);
  const indexname = process.env.REACT_APP_INDEX_NAME;
  const [fuzzinessval,setFuzzinessval]=useState(2);
  const [queryFormatval,setQueryFormatval]=useState("or");
  const [allMatch, setAllMatch] = useState(false);
  const [phraseMatch, setPhraseMatch] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const [viewCount, setViewCount] = useState(false);
  const [splitDone,setSplitDone] = useState(false);
  const [nextWord, setNextWord] = useState("");
  const [searchText,setSearchText]=useState("");
  let imageItems = [];

  useEffect(() => {
   
    if(searchText.trim() !== "" && searchText.length > 0) {
      setViewCount(true);

    }
    else{
      setViewCount(false);
    }
  }, [searchText]);

  const updatenumberOfResult = (newResults) => {
    setNumberOfResult(newResults);
  };

  const handleRangeChange = (event) => {
    const newValue = parseInt(event.target.value);
    setNumberOfResult(newValue);
    // Perform actions with the new value
    console.log("Current value: " + newValue);
  };


  // function generateLinkString(url) {
  //   const parts = url.split('/');
  //   const domain = parts[2];
  //   const pathParts = parts.slice(3).map((part) => part.split('.')[0]);
  //   const formattedURL = `${domain} > ${pathParts.join(' > ')}`;
  //   return formattedURL;
  // }

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
    let sortterm =value;
    const words = value.trim().split(/\s+/);
    const maxWords = 25;
    
    if(words.length > maxWords){
      const truncatedValue = words.slice(0, maxWords).join(' ');
      setSplitDone(true);
      const thirtyThirdWord = words[maxWords];
      console.log(thirtyThirdWord,'thirdy third word');
      setNextWord(thirtyThirdWord);
      setSearchText(truncatedValue);
    }
    else{
      setSplitDone(false);
    }
   
    setSearchText(sortterm)
   //console.log(searchText,'searchText')
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
                          "minimum_should_match": 5
                        }
                      },
                      {
                        "multi_match": {
                          "query": value,
                          "fields": ["title^7", "filedetails^4", "artists^3", "album^2", "imgtags^1","filename^1"],
                          "type": "phrase",
                          "operator": queryFormatval,
                          "minimum_should_match": 5
                        }
                      },
                      {
                        "multi_match": {
                          "query": value,
                          "fields": ["title^7", "filedetails^4", "artists^3", "album^2", "imgtags^1","filename^1"],
                          "type": "phrase_prefix",
                          "operator": queryFormatval,
                          "minimum_should_match": 5
                        }
                      }
                    ],
                    // "minimum_should_match": 5
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
          <input type="range" id="points" name="points" min="2" max="20" value={numberOfResult} onChange={handleRangeChange} style={{display:"inline"}}/>
          {viewCount?<p style={{display:"inline",marginLeft:"8.6rem",color:"#9b9b9b",marginTop:"0px"}}>{numberOfResult}</p>:<p></p>}
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
           debounce={0}
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
                <a href="http://chipstersearch/searchhelp" style={{ textDecoration: "none", color: "#3ea9e6", marginRight: "10px" }}><h5 style={{ display: "inline" }}>Search Help</h5></a>
                <a href="http://chipstersearch/advanced" style={{ textDecoration: "none", color: "#3ea9e6" }}><h5 style={{ display: "inline",marginRight:"15px" }}>Advanced Search</h5></a>
              </div>
              
            </div>
            {splitDone  && <p style={{ whiteSpace: "pre-line",marginRight:"10px" }}>
            <span style={{ color: "rgb(152, 152, 152)", padding: "2px",fontWeight:"bold" }}>{nextWord}</span> and any subsequent words was ignored because we limit queries to 25 words
             </p>}

            <SelectedFilters showClearAll={true} clearAllLabel="Clear filters" />

           <ReactiveList
          //  showResultStats={false}
          loader="Loading Results.."
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
                  <p style={{color:"#424242", fontSize:"large"}}>Please type in the search bar to search</p>
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
            { console.log(data)
             
           return (
              <Tab data={data} updatenumberOfResult={updatenumberOfResult}/>
              // <ReactiveList.ResultListWrapper>
              //   {
                
                
              //   data.map((item,index) => {

              //     let urlnew=generateLinkString(item.url)
              //     //console.log(urlnew,'urlnew');
                 
              //     //console.log(item)
              //     if (item.filetype === "image") {
              //     // console.log(item)
              //     currImage =currImage+1;
                
              //      const shouldAddItem = imageItems.length<4
                  

              //      if(shouldAddItem){
                  
              //        imageItems.push(item)
                    
              //       }

              //      const shouldRenderImage = imageItems.length>=4 || index ===data.length-1 || currImage === numImages
              //      let imageData = imageItems;
                  
              //      if(shouldRenderImage) {
                   
              //       imageItems = [];
              //       return (
              //         <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              //           {imageData.map((imageVal) => (
              //             <div key={imageVal.url} style={{ display: "flex", flexDirection: "column", borderRadius: "8px", borderBottom: "1px solid #efefef", marginLeft: "5px", padding: "5px", width: "15rem" }}>
              //               <a href={imageVal.url} style={{ display: "flex", borderRadius: "8px", textDecoration: "none", color: "#424242" }}>
              //                 <img src={imageVal.url} style={{ width: "100%", height: "15rem", objectFit: "cover", borderRadius: "8px",marginRight:"15px" }} />
              //               </a>
              //               <div style={{ margin:"0px" }}>
              //                 <div style={{ display: "flex", alignItems: "center" }}>
              //                   <h4 style={{ margin:"0" }}>Website:</h4>
              //                   <p style={{ margin:"3px" }}>{imageVal.baseurl}</p>
              //                 </div>
              //                 <div style={{ display: "flex", alignItems: "center" }}>
              //                   <h4 style={{ margin:"0px" }}>Image Name:</h4>
              //                   <p  style={{ margin:"3px" }}>{imageVal.filename ? imageVal.filename : "No Information Available"}</p>
              //                 </div>
              //                 <div style={{ display: "flex", alignItems: "center" }}>
              //                   <h4 style={{ margin:"0px"}}>Image Size:</h4>
              //                   <p  style={{ margin:"3px" }}>{imageVal.filesize ? Math.round(imageVal.filesize / 1000) + "KB" : "No Information Available"}</p>
              //                 </div>
              //                 <div style={{ display: "flex", alignItems: "center" }}>
              //                   <h4 style={{  margin:"0px"}}>Dimensions:</h4>
              //                   <p  style={{ margin:"3px" }}>{(imageVal.length && imageVal.width) ? imageVal.length + "px * " + imageVal.width + "px" : "No Information Available"}</p>
              //                 </div>
              //               </div>
              //             </div>
              //           ))}
              //         </div>
              //       );
                    
                    
                   
              //      }
              //      else{
              //        return null;
              //      }
                  
              //     }
              //   else{
              //     //console.log(item)
              //   return  (
                  
              //       <ResultList key={item._id}>
                      
              //         {/* <ResultList.Image
              //           style={{
              //             backgroundSize: "cover",
              //             backgroundImage: `url(${item.image})`
              //           }}
              //         /> */}
              //          <ResultList.Content>
              //           <a href={item.url} style={{ textDecoration: "none", color: "#3ea9e6" }}>
                      
              //         <ResultList.Title
              //         style={{ textDecoration: "none", color: "#3ea9e6" }}
              //           dangerouslySetInnerHTML={{
              //             __html: item.title?item.title:"No Title Found"
              //           }}
              //         />
              //         <p style={{textDecoration:"none", color:"#989898",fontWeight: "bold"}}>{urlnew}</p>
              //         </a>
              //         <ResultList.Description>
              //           {item.filedetails.substring(0, 250)}
              //         </ResultList.Description>
              //         </ResultList.Content>
              //       </ResultList>
              //     )
              //   }
              //  })}
              // </ReactiveList.ResultListWrapper>
              
            )}}
          />
        
        </div>
        
      </div>
     
    </ReactiveBase>
    </div>
  );
}

export default Searchpage;