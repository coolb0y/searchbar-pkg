import { useEffect, useState } from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  ReactiveList,
  SingleRange,
  ResultList,
  SelectedFilters,
} from "@appbaseio/reactivesearch";
import "./styles.css";
import ImageTab from "./imageTab";

function Searchpage() {
  const [numberOfResult, setNumberOfResult] = useState(8);
  const indexname = process.env.REACT_APP_INDEX_NAME;
  const [fuzzinessval, setFuzzinessval] = useState(2);
  const [queryFormatval, setQueryFormatval] = useState("or");
  const [allMatch, setAllMatch] = useState(false);
  const [phraseMatch, setPhraseMatch] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const [viewCount, setViewCount] = useState(false);
  const [splitDone, setSplitDone] = useState(false);
  const [nextWord, setNextWord] = useState("");
  const [searchText, setSearchText] = useState("");
  const [imageFilterUsed, setImageFilterUsed] = useState(false);
  const [toggleActive, setToggleActive] = useState(true);

  useEffect(() => {
    if (searchText.trim() !== "" && searchText.length > 0) {
      setViewCount(true);
    } else {
      setViewCount(false);
    }
  }, [searchText]);

  const handleFilterChange = (filter) => {
    // console.log(filter.filetypefilter?filter.filetypefilter.value:null,'change filter');
    if (filter && filter.filetypefilter && filter.filetypefilter.value) {
      if (filter.filetypefilter.value.includes("image")) {
        setImageFilterUsed(true);
      } else {
        setImageFilterUsed(false);
        updatenumberOfResult(8);
      }
    } else {
      setImageFilterUsed(false);
      updatenumberOfResult(8);
    }
  };

  const updatenumberOfResult = (newResults) => {
    setNumberOfResult(newResults);
  };

  function generateLinkString(url) {
    const parts = url.split("/");
    const domain = parts[2];
    const pathParts = parts.slice(3).map((part) => part.split(".")[0]);
    const formattedURL = `${domain} > ${pathParts.join(" > ")}`;
    return formattedURL;
  }

  const handleAllMatchChange = () => {
    setAllMatch(!allMatch);
    console.log(allMatch);
    if (allMatch) {
      setFuzzinessval(3);
      setQueryFormatval("or");
    } else if (!allMatch) {
      //console.log(allMatch,'All Match fn1')
      setFuzzinessval(0);
      setQueryFormatval("and");
    }
  };

  const handlePhraseMatchChange = (event) => {
    setPhraseMatch(event.target.checked);
    //  console.log(phraseMatch,'phraseMatch fn')
  };

  const handleImageToggleChange = () => {
    setToggleActive(!toggleActive);
  };

  const handleImageToggleDiv = () => {
    setToggleActive(!toggleActive);
  };

  const customQueryfn = (value, props) => {
    //console.log(value,'value');
    let sortterm = value;
    const words = value.trim().split(/\s+/);
    const maxWords = 25;

    if (words.length > maxWords) {
      const truncatedValue = words.slice(0, maxWords).join(" ");
      setSplitDone(true);
      const thirtyThirdWord = words[maxWords];
      //console.log(thirtyThirdWord,'thirdy third word');
      setNextWord(thirtyThirdWord);
      setSearchText(truncatedValue);
    } else {
      setSplitDone(false);
    }

    setSearchText(sortterm);

    if (value.trim() !== "") {
      setIsSearchEmpty(false);
      if (phraseMatch) {
        return {
          query: {
            bool: {
              should: [
                {
                  multi_match: {
                    query: value,
                    type: "phrase",
                    fields: [
                      "title^7",
                      "filedetails^4",
                      "artists^3",
                      "album^2",
                      "imgtags^1",
                      "filename^1",
                    ],
                  },
                },
              ],
            },
          },
          size: 10,
          _source: {
            includes: ["*"],
            excludes: [],
          },
        };
      } else {
        // Use the default query
        // console.log("default query match",phraseMatch)
        return {
          query: {
            bool: {
              must: [
                {
                  bool: {
                    should: [
                      {
                        multi_match: {
                          query: value,
                          fields: [
                            "title^7",
                            "filedetails^4",
                            "artists^3",
                            "album^2",
                            "imgtags^1",
                            "filename^1",
                          ],
                          type: "best_fields",
                          operator: queryFormatval,
                          fuzziness: "AUTO",
                        },
                      },
                      {
                        multi_match: {
                          query: value,
                          fields: [
                            "title^7",
                            "filedetails^4",
                            "artists^3",
                            "album^2",
                            "imgtags^1",
                            "filename^1",
                          ],
                          type: "phrase",
                          operator: queryFormatval,
                        },
                      },
                      {
                        multi_match: {
                          query: value,
                          fields: [
                            "title^7",
                            "filedetails^4",
                            "artists^3",
                            "album^2",
                            "imgtags^1",
                            "filename^1",
                          ],
                          type: "phrase_prefix",
                          operator: queryFormatval,
                        },
                      },
                    ],
                    // "minimum_should_match": 1
                  },
                },
              ],
            },
          },
          size: 6,
          _source: {
            includes: ["*"],
            excludes: [],
          },
        };
      }
    }
    return null;
  };

  return (
    <div
      style={{
        textAlign: "left",
        marginTop: "0px",
        marginBottom: "0",
        display: "block",
      }}
    >
      <ReactiveBase
        url="http://admin:admin@127.0.0.1:9200"
        app={indexname ? indexname : "chipsterindex"}
        credentials="admin:admin"
        enableAppbase={false}

        // headers={{
        // 	Authorization:  btoa('readall:Total123@') // Replace with your username and password
        // }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "block",
              flexDirection: "column",
              width: "30%",
              margin: "15px",
              maxHeight: "700px",
              maxWidth: "350px",
              marginTop: "30px",
              paddingRight: "15px",
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/SearchPageLogo.png"}
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
                transformData={(filetypefield) => {
                  const keyOrder = {
                    webpage: 1,
                    image: 2,
                    pdf: 3,
                    video: 4,
                    "doc-docx": 5,
                    text: 6,
                  };

                  // Sort the originalData array based on the keyOrder
                  const sortedArray = filetypefield.sort(
                    (a, b) => keyOrder[a.key] - keyOrder[b.key]
                  );
                  return sortedArray;
                }}
                // onChange={filetypeChange}
                showCount={viewCount}
                //size={4}
                react={{
                  and: [
                    "searchbox",
                    "sizefilter",
                    "baseurlfilter",
                    "filetypefilter",
                  ],
                }}
                innerClass={{
                  list: "list-container",
                }}
                className="filtetypefilterfield"
              />

              {imageFilterUsed ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "-2px",
                    marginTop: "-0.7rem",
                    marginBottom: "1.1rem",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onClick={handleImageToggleDiv}
                >
                  <input
                    type="checkbox"
                    className="checkbox-toggle"
                    checked={toggleActive}
                    onChange={handleImageToggleChange}
                    style={{
                      color: "#0B6AFF",
                      width: "1.12rem",
                      height: "1.13rem",
                      position: "relative",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  />

                  <label
                    id="imageToggleLabel"
                    style={{
                      marginLeft: "5px",
                      textAlign: "center",
                      userSelect: "none",
                    }}
                  >
                    hide tiny images
                  </label>
                </div>
              ) : null}

              <MultiList
                showSearch={true}
                componentId="baseurlfilter"
                dataField="baseurl"
                title="Filter by Website"
                fielddata={true}
                filterLabel="websitefilter"
                // size={4}
                showCount={viewCount}
                innerClass={{
                  list: "list-container",
                  title: "baseurlfiltertitle",
                }}
                react={{
                  and: [
                    "searchbox",
                    "sizefilter",
                    "baseurlfilter",
                    "filetypefilter",
                  ],
                }}
              />

              <SingleRange
                componentId="sizefilter"
                dataField="filesize"
                title="Filter by File Size"
                innerClass={{
                  title: "sizefiltertitle",
                }}
                react={{
                  and: [
                    "searchbox",
                    "sizefilter",
                    "baseurlfilter",
                    "filetypefilter",
                  ],
                }}
                data={[
                  { start: 1000000, end: 2000000, label: "1Mb to 2Mb" },
                  { start: 2000001, end: 5000000, label: "2Mb to 5Mb" },
                  { start: 5000001, end: 10000000, label: "5Mb to 10Mb" },
                  {
                    start: 10000001,
                    end: 5000000000,
                    label: "Bigger than 10Mb",
                  },
                ]}
                defaultValue=""
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "66%",
              minWidth: "66%",
            }}
          >
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
                "filename",
              ]}
              react={{
                and: [
                  "searchbox",
                  "sizefilter",
                  "baseurlfilter",
                  "filetypefilter",
                ],
              }}
              fieldWeights={[7, 4, 3, 2, 1]}
              placeholder="Search.."
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={allMatch}
                  style={{
                    width: "19px",
                    height: "19px",
                    marginLeft: "10px",
                    marginRight: "5px",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onChange={handleAllMatchChange}
                />
                <label
                  htmlFor="allMatch"
                  style={{
                    marginBottom: "2px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  Match All Terms
                </label>

                <input
                  type="checkbox"
                  checked={phraseMatch}
                  style={{
                    width: "19px",
                    height: "19px",
                    marginLeft: "1px",
                    marginRight: "5px",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onChange={handlePhraseMatchChange}
                />

                <label
                  htmlFor="phraseMatch"
                  style={{ marginBottom: "2px", cursor: "pointer" }}
                >
                  Match Exact Phrase
                </label>
              </div>

              <div>
                <a
                  href="http://chipstersearch/searchhelp"
                  style={{
                    textDecoration: "none",
                    color: "#3ea9e6",
                    marginRight: "10px",
                  }}
                >
                  <h5 style={{ display: "inline" }}>Search Help</h5>
                </a>
              </div>
            </div>
            {splitDone && (
              <p style={{ whiteSpace: "pre-line", marginRight: "10px" }}>
                <span
                  style={{
                    color: "rgb(152, 152, 152)",
                    padding: "2px",
                    fontWeight: "bold",
                  }}
                >
                  {nextWord}
                </span>{" "}
                and any subsequent words was ignored because we limit queries to
                25 words
              </p>
            )}

            <SelectedFilters
              // onClear={(component, values) => {
              //   if (component === "filetypefilter") {
              //     let elementFiletypefilter = document.querySelector(
              //       '[aria-label="filetypefilter-search"]'
              //     );
              //     console.log(elementFiletypefilter.value); // Check if the correct value is logged
              //     elementFiletypefilter.value = ""; // Reset the value
              //   }

              //   if (component === "baseurlfilter") {
              //     var elementBaseurlfilter = document.querySelector(
              //       '[aria-label="baseurlfilter-search"]'
              //     );
              //     console.log(elementBaseurlfilter);
              //     elementBaseurlfilter.value = "";
              //   }
              //   console.log(
              //     `${component} has been removed with value as ${values}`
              //   );
              // }}
              showClearAll={true}
              clearAllLabel="Clear filters"
              onChange={handleFilterChange}
            />

            <ReactiveList
              //  showResultStats={false}
              loader="Loading Results.."
              onQueryChange={function (prevQuery, nextQuery) {
                if ("match_all" in nextQuery["query"]) {
                  setIsSearchEmpty(true);

                  nextQuery["query"] = { match_none: {} };
                }
              }}
              renderNoResults={() => {
                if (isSearchEmpty) {
                  return (
                    <div style={{ paddingLeft: "10px" }}>
                      <p style={{ color: "#424242", fontSize: "large" }}>
                        Please type in the search bar to search
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div
                      style={{
                        paddingLeft: "10px",
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans,Helvetica Neue, sans-serif",
                      }}
                    >
                      <h4>No Results Found</h4>
                      <p>
                        Sorry, we couldn't find any results for your search
                        query.
                      </p>
                    </div>
                  );
                }
              }}
              componentId="results"
              dataField="title"
              size={numberOfResult}
              pagination={false}
              infiniteScroll={true}
              react={{
                and: [
                  "searchbox",
                  "sizefilter",
                  "baseurlfilter",
                  "filetypefilter",
                ],
              }}
              style={{ textAlign: "left" }}
              render={({ data }) => {

                // console.log(data)
                if (!imageFilterUsed) {
                  return (
                    <ReactiveList.ResultListWrapper>
                      {data.map((item, index) => {
                        let urlnew = generateLinkString(item.url);

                        return (
                          <ResultList key={item._id}>
                            <ResultList.Content>
                              <a
                                href={item.url}
                                style={{
                                  textDecoration: "none",
                                  color: "#3ea9e6",
                                }}
                              >
                                <ResultList.Title
                                  style={{
                                    textDecoration: "none",
                                    color: "#3ea9e6",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: item.title
                                      ? item.title
                                      : "No Title Found",
                                  }}
                                />
                                <p
                                  style={{
                                    textDecoration: "none",
                                    color: "#989898",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {urlnew}
                                </p>
                              </a>
                              <ResultList.Description>
                                {item.filedetails
                                  ? item.filedetails.substring(0, 250)
                                  : ""}
                              </ResultList.Description>
                            </ResultList.Content>
                          </ResultList>
                        );
                        // }
                      })}
                    </ReactiveList.ResultListWrapper>
                  );
                } else if (imageFilterUsed) {
                  return (
                    <ImageTab
                      data={data}
                      toggleActive={toggleActive}
                      updateResult={updatenumberOfResult}
                    />
                  );
                }
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    </div>
  );
}

export default Searchpage;
