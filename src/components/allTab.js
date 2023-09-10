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



function allTab(props){
    
    const data = props.data || [];
    console.log(data,'alltab');
    
    let imageItems =[];
    function generateLinkString(url) {
        const parts = url.split('/');
        const domain = parts[2];
        const pathParts = parts.slice(3).map((part) => part.split('.')[0]);
        const formattedURL = `${domain} > ${pathParts.join(' > ')}`;
        return formattedURL;
      }
      const numImages = data.filter(item => item.filetype === 'image').length;
      let currImage=0;
    return (
        <ReactiveList.ResultListWrapper>
        {
        
        
        data.map((item,index) => {

          let urlnew=generateLinkString(item.url)
          //console.log(urlnew,'urlnew');
         
          //console.log(item)
          if (item.filetype === "image") {
          // console.log(item)
          currImage =currImage+1;
        
           const shouldAddItem = imageItems.length<4
          

           if(shouldAddItem){
          
             imageItems.push(item)
            
            }

           const shouldRenderImage = imageItems.length>=4 || index ===data.length-1 || currImage === numImages
           let imageData = imageItems;
          
           if(shouldRenderImage) {
           
            imageItems = [];
            return (
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {imageData.map((imageVal) => (
                  <div key={imageVal.url} style={{ display: "flex", flexDirection: "column", borderRadius: "8px", borderBottom: "1px solid #efefef", marginLeft: "5px", padding: "5px", width: "15rem" }}>
                    <a href={imageVal.url} style={{ display: "flex", borderRadius: "8px", textDecoration: "none", color: "#424242" }}>
                      <img src={imageVal.url} style={{ width: "100%", height: "15rem", objectFit: "cover", borderRadius: "8px",marginRight:"15px" }} />
                    </a>
                    <div style={{ margin:"0px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h4 style={{ margin:"0" }}>Website:</h4>
                        <p style={{ margin:"3px" }}>{imageVal.baseurl}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h4 style={{ margin:"0px" }}>Image Name:</h4>
                        <p  style={{ margin:"3px" }}>{imageVal.filename ? imageVal.filename : "No Information Available"}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h4 style={{ margin:"0px"}}>Image Size:</h4>
                        <p  style={{ margin:"3px" }}>{imageVal.filesize ? Math.round(imageVal.filesize / 1000) + "KB" : "No Information Available"}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h4 style={{  margin:"0px"}}>Dimensions:</h4>
                        <p  style={{ margin:"3px" }}>{(imageVal.length && imageVal.width) ? imageVal.length + "px * " + imageVal.width + "px" : "No Information Available"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
            
            
           
           }
           else{
             return null;
           }
          
          }
        else{
          //console.log(item)
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
    )
}

export default allTab;