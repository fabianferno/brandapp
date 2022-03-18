import React, { useState } from "react";
import { create } from "ipfs-http-client";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import Layout from "../layouts/Layout";
import { abi } from "../abi.js";

import { Web3Storage } from "web3.storage";

function makeStorageClient() {

  return new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweENkMkU1OEFFMGQ0YTMzNTMwZGZlQ0U2ZGU4ZDMyYzMyOWU2ODI2RDciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDc1NDE0Mjk2NzQsIm5hbWUiOiJicmFuZGFwcCJ9.RpDmipLiDzbymOOPfeE8OBifP32oxxuLhmkIftUGvb4" });
}

const client = create("https://ipfs.infura.io:5001/api/v0");



export default function CreateBrand() {
  const [logoName, setLogoName] = useState("");
  const [logoUrl, setLogoUrl] = useState("https://via.placeholder.com/500x500.png?text=Logo+Full");
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [brandOverview, setBrandOverview] = useState("");
  const [guidelinesValue, setGuidelinesValue] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [dos, setDos] = useState("");
  const [donts, setDonts] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#ffffff");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const [primaryFont, setPrimaryFont] = useState("");
  const [secondaryFont, setSecondaryFont] = useState("");
  const [mockupUrl, setMockupUrl] = useState("https://via.placeholder.com/500x500.png?text=Mockup+Image");


  const { native } = useMoralisWeb3Api();
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const options = {
    chain: "mumbai",
    address: "0x63c954AebdE9E7a448835FE1A89e25A40D8695c5",
    function_name: "mint",
    abi: abi,
  }
  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...options }
  );


  async function retrieveLogo(e) {
    const file = e.target.files[0];
    try {
      const client = makeStorageClient();
      const cid = await client.put([file]);

      var fullPath = e.target.value;

      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      const url = `https://${cid}.ipfs.dweb.link/${filename}`;

      setLogoUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function retrieveMockup(e) {
    const file = e.target.files[0];
    try {
      const client = makeStorageClient();
      const cid = await client.put([file]);

      var fullPath = e.target.value;

      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      const url = `https://${cid}.ipfs.dweb.link/${filename}`;

      setMockupUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  function makeFileObjects(obj) {
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    const files = [
      new File([blob], `${obj.slugName}.json}`)
    ]
    return files
  }


  async function createBrand() {
    let schema = {
      slugName: brandName.split(" ").join("-"),
      brandName,
      brandDescription,
      brandOverview,
      guidelinesValue,
      pronunciation,
      logoName,
      logoUrl,
      donts,
      dos,
      primaryColor,
      secondaryColor,
      primaryFont,
      secondaryFont,
      mockupUrl,
    };
    // Call API to create brand
    const client = makeStorageClient();
    const cid = await client.put(makeFileObjects(schema));

    const metadata = `https://${cid}.ipfs.dweb.link/${schema.slugName}.json`;

    console.log(metadata);

    // fetch({
    //   params: { _to: user.get("ethAddress"), _uri: url }
    // });
    await authenticate({ signingMessage: "Mint your NFT" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <Layout>
      <section className="pt-2">
        <div className="text-dark container">
          <div className="mb-5 d-flex justify-content-between align-items-center">
            <h1 className="fw-bold" style={{ fontSize: "5rem" }}>Mint your Brand</h1>
          </div>
          <section className="pb-5 mb-5">
            <form>
              <div className="form-group  my-4">
                <label htmlFor="inputName" className="text-secondary pb-2">
                  Brand Name
                </label>
                <input
                  value={brandName}
                  type="text"
                  style={{ width: "100%" }}
                  className="p-3 d-flex bg-dark col-md-6 text-white rounded focus-none"
                  id="inputName"
                  placeholder="Eg. Netflix"
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>

              <div className="form-group  my-4">
                <label htmlFor="inputDescription" className="text-secondary pb-2">
                  Brand Description
                </label>
                <input
                  type="text"
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  value={brandDescription}
                  onChange={(e) => setBrandDescription(e.target.value)}
                  style={{ width: "100%" }}
                  id="inputDescription"
                  placeholder="Eg. Netflix is a streaming service that offers a wide variety of content, including movies, TV shows, anime, documentaries, and more. It is owned by Netflix, Inc., a Delaware corporation."
                />
              </div>


              <div className="form-group  my-4">
                <label htmlFor="inputOverview" className="text-secondary pb-2">
                  Brand Overview
                </label>
                <input
                  type="text"
                  className={
                    "p-3 d-flex bg-dark  text-white rounded focus-none"
                  }
                  value={brandOverview}
                  onChange={(e) => setBrandOverview(e.target.value)}
                  style={{ width: "100%" }}
                  id="inputOverview"
                  placeholder="Eg. Netflix is a streaming service that offers a wide variety of content, including movies, TV shows, anime, documentaries, and more. It is owned by Netflix, Inc., a Delaware corporation."
                />
              </div>


              <div className="">
                <label htmlFor="inputOverview" className="text-secondary pb-2 ">
                  General Guidelines
                </label>
                <textarea
                  value={guidelinesValue}
                  onChange={(e) => setGuidelinesValue(e.target.value)}
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputDos"
                  placeholder="Eg. Check the right sizes"
                />
              </div>


              <div className="form-group  my-4">
                <label htmlFor="inputPronunciation" className="text-secondary pb-2">
                  Pronunciation
                </label>
                <input
                  type="text"
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  value={pronunciation}
                  onChange={(e) => setPronunciation(e.target.value)}
                  style={{ width: "100%" }}
                  id="inputPronunciation"
                  placeholder="li-cet patt-ar-ee"
                />
              </div>


              <div className="col-md-12">
                <label
                  htmlFor="inputLogo"
                  className="text-secondary pb-2 form-label"
                >
                  Logo
                </label>
                <div className="w-100">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Logo Name"
                      value={logoName}
                      onChange={(e) =>
                        setLogoName(e.target.value)
                      }
                    />
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={(e) =>
                        retrieveLogo(e)
                      }
                    />
                  </div>
                </div>
                <img
                  className="card card-body"
                  style={{ height: "400px" }}
                  src={logoUrl}
                  alt=""
                />
              </div>



              <div className="form-group my-4">
                <label htmlFor="inputDos" className="text-secondary pb-2">
                  Do's
                </label>
                <textarea
                  value={dos}
                  onChange={(e) => setDos(e.target.value)}
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputDos"
                  placeholder="Eg. Do attribute the license"
                />
              </div>




              <div className="form-group  my-4">
                <label htmlFor="inputDonts" className="text-secondary pb-2">
                  Dont's
                </label>
                <textarea
                  value={donts}
                  onChange={(e) => setDonts(e.target.value)}
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputDonts"
                  placeholder="Eg. Do not rotate the logo."
                />
              </div>




              <label htmlFor="inputColor" className="text-secondary form-label pb-2">
                Colors
              </label>
              <div className="d-flex">
                <div className="mx-2">
                  <input
                    type="color"
                    className="form-control form-control-color rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                    id="exampleColorInput"
                    value={primaryColor}

                    title="Choose your color"
                    onChange={(e) => setPrimaryColor(e.target.value)}
                  ></input>
                </div>
                <div className="mx-2">
                  <input
                    type="color"
                    className="form-control form-control-color rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                    id="exampleColorInput"
                    value={secondaryColor}
                    title="Choose your color"
                    onChange={(e) => setSecondaryColor(e.target.value)}
                  ></input>
                </div>
              </div>


              <div className="form-group  my-4">
                <label htmlFor="inputFonts" className="text-secondary pb-2">
                  Fonts
                </label>
                <input
                  type="text"
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputFonts"
                  placeholder="Primary Font"
                  value={primaryFont}
                  onChange={(e) => setPrimaryFont(e.target.value)}
                />
              </div>
              <div className="form-group  my-4">
                <input
                  type="text"
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputFonts"
                  placeholder="Secondary Font"
                  value={secondaryFont}
                  onChange={(e) => setSecondaryFont(e.target.value)}
                />
              </div>


              <div className="me-md-4 my-4">
                <label
                  htmlFor="inputMockups"
                  className="text-secondary pb-2 form-label "
                >
                  Mockups
                </label>
                <input
                  type="file"
                  className="form-control py-3"
                  placeholder="Upload Mockup Images"
                  onChange={(e) => retrieveMockup(e)}
                />
              </div>

              <img
                className="card card-body"
                style={{ height: "400px" }}
                src={mockupUrl}
                alt=""
              />
            </form>

            <hr />

            <div
              onClick={createBrand}
              className="mt-5 btn d-block btn-lg fw-bold btn-primary p-3"
            >
              Mint your Brand 💫
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
}
