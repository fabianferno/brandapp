import React, { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { MdOutlineCancel } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import { create } from "ipfs-http-client";
import Layout from "../layouts/Layout";

import { Web3Storage } from "web3.storage";

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function CreateBrand() {
  const [inputLogo, setInputLogo] = useState({
    name: "",
    url: "",
    otherVariation: [],
  });

  const [guidlinesValue, setGuidlinesValue] = useState("");

  const [colors, setColors] = useState({
    primary: "#ffffff",
    secondary: "#000000",
  });
  const [fonts, setFonts] = useState({ primary: "", secondary: "" });
  const [mockupUrl, setMockupUrl] = useState([""]);

  // async function retrieveMockup(e) {
  //   const file = e.target.files[0];
  //   try {
  //     const added = await client.add(file);
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`;
  //     setMockupUrl(url);
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //   }
  // }

  function retrieveMockup(i, event) {
    const value = [...mockupUrl];
    value[i] = event.target.files[0];
    setMockupUrl(value);
    console.log(event.target.files[0]);
  }

  function addMockupInput() {
    const value = [...mockupUrl];
    value.push("");
    setMockupUrl(value);
  }

  function removeMockupInput(index) {
    const value = [...mockupUrl];
    value.splice(index, 1);
    setMockupUrl(value);
  }

  function addInput() {
    const values = { ...inputLogo };
    console.log(values);
    values.otherVariation.push({ name: "", url: "" });
    setInputLogo(values);
    console.log(inputLogo);
  }
  function removeInput(i) {
    const values = { ...inputLogo };
    values.otherVariation.splice(i, 1);
    setInputLogo(values);
  }
  function handleLogoChange(i, event) {
    const values = { ...inputLogo };
    values.otherVariation[i].name = event.target.value;
    setInputLogo(values);
  }
  function handleFileChange(i, event) {
    const values = { ...inputLogo };
    values.otherVariation[i].url = event.target.files[0];
    setInputLogo(values);
  }

  const orgNameInputRef = useRef();
  const brandOverviewInputRef = useRef();
  const pronunciationInputRef = useRef();
  const orgDescriptionInputRef = useRef();
  const dosInputRef = useRef();
  const dontsInputRef = useRef();

  async function createBrand() {
    const organisationName = orgNameInputRef.current.value;
    const brandOverview = brandOverviewInputRef.current.value;
    const pronunciation = pronunciationInputRef.current.value;
    const organisationDescription = orgDescriptionInputRef.current.value;
    const dos = dosInputRef.current.value;
    const donts = dontsInputRef.current.value;
    const slugName = organisationName.split(" ").join("-");

    let schema = {
      [slugName]: {
        organizationName: organisationName,
        orgDescription: organisationDescription,
        brandOverview: brandOverview,
        generalGuidelines: guidlinesValue,
        pronunciation: pronunciation,
        logo: {
          logos: [{ ...inputLogo }],
          donts: donts,
          dos: dos,
        },
        colors: colors,
        fonts: fonts,
        mockupImages: mockupUrl,
      },
    };
    console.log(schema);

    // Call API to create brand
  }

  function getFiles() {
    const fileInput = document.querySelector('input[type="file"]');
    return fileInput.files;
  }
  async function storeFiles(file) {
    const client = makeStorageClient();
    const cid = await client.put(file);
    console.log("stored files with cid:", cid);
    return cid;
  }

  return (
    <Layout>
      <section className="pt-2">
        <div className="text-dark container">
          <div className="mb-5 d-flex justify-content-between align-items-center">
            <h1 className="fw-bold">Create Brand</h1>
          </div>
          <section className="pb-5 mb-5">
            <form>
              <div className="form-group  my-4">
                <label htmlFor="inputName" className="text-dark">
                  Organisation Name
                </label>
                <input
                  ref={orgNameInputRef}
                  type="text"
                  style={{ width: "100%" }}
                  className="p-3 d-flex bg-dark col-md-6 text-white  rounded focus-none"
                  id="inputName"
                  placeholder="Organisation Name - Eg. Netflix"
                />
              </div>

              <div className="form-group  my-4">
                <label htmlFor="inputDescription" className="text-dark">
                  Organisation description
                </label>
                <input
                  ref={orgDescriptionInputRef}
                  type="text"
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputDescription"
                  placeholder="Netflix is a streaming service that offers a wide variety of content, including movies, TV shows, anime, documentaries, and more. It is owned by Netflix, Inc., a Delaware corporation."
                />
              </div>

              <div className="form-group  my-4">
                <label htmlFor="inputOverview" className="text-dark">
                  Brand Overview
                </label>
                <input
                  ref={brandOverviewInputRef}
                  type="text"
                  className={
                    "p-3 d-flex bg-dark  text-white rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputOverview"
                  placeholder="Netflix is a streaming service that offers a wide variety of content, including movies, TV shows, anime, documentaries, and more. It is owned by Netflix, Inc., a Delaware corporation."
                />
              </div>
              <div className="">
                <label htmlFor="inputOverview" className="text-dark ">
                  General Guidlines
                </label>
                <MDEditor
                  height={200}
                  value={guidlinesValue}
                  onChange={setGuidlinesValue}
                />
              </div>
              <div className="form-group  my-4">
                <label htmlFor="inputPronunciation" className="text-dark">
                  pronunciation
                </label>
                <input
                  ref={pronunciationInputRef}
                  type="text"
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputPronunciation"
                  placeholder="li-cet patt-ar-ee"
                />
              </div>
              <div className="col-md-12">
                <label
                  htmlFor="inputLogo"
                  className="text-dark form-label my-4 "
                >
                  Logo
                </label>
                <div className="d-inline-block">
                  <button
                    className="btn"
                    type="button"
                    sx={{ color: "#182340" }}
                    aria-label="add"
                    component="span"
                    onClick={addInput}
                  >
                    <CgAdd sx={{ width: "40px", height: "40px" }} />
                  </button>
                </div>

                <div className="w-100">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Logo Name"
                      aria-label="Logo Name"
                      aria-describedby="button-addon2"
                      value={inputLogo.name}
                      onChange={(e) => {
                        const values = { ...inputLogo };
                        values.name = e.target.value;
                        setInputLogo(values);
                      }}
                    />
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={(e) => {
                        const values = { ...inputLogo };
                        values.url = e.target.files[0];
                        setInputLogo(values);
                      }}
                    />
                  </div>
                </div>

                {inputLogo.otherVariation.length > 0 &&
                  inputLogo.otherVariation.map((input, index) => (
                    <div
                      key={`${input}-${index}`}
                      className={`${index > 0 && "mt-2"}`}
                    >
                      <div className="d-flex">
                        <div className="">
                          <button
                            onClick={() => removeInput(index)}
                            className="btn"
                            type="button"
                            sx={{ color: "#ec523e" }}
                            aria-label="cancel"
                            component="span"
                          >
                            <MdOutlineCancel
                              sx={{ width: "40px", height: "40px" }}
                            />
                          </button>
                        </div>

                        <div className="w-100">
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Logo Name"
                              aria-label="Logo Name"
                              aria-describedby="button-addon2"
                              value={input.name}
                              onChange={(e) => {
                                handleLogoChange(index, e);
                              }}
                            />
                            <input
                              className="form-control"
                              type="file"
                              id="formFile"
                              onChange={(e) => {
                                handleFileChange(index, e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="form-group  my-4">
                <label htmlFor="inputDos" className="text-dark">
                  Do's
                </label>
                <textarea
                  ref={dosInputRef}
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputDos"
                  placeholder="Do's"
                />
              </div>
              <div className="form-group  my-4">
                <label htmlFor="inputDonts" className="text-dark">
                  Dont's
                </label>
                <textarea
                  ref={dontsInputRef}
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputDonts"
                  placeholder="Dont's"
                />
              </div>
              <label htmlFor="inputColor" className="text-dark form-label ">
                Colors
              </label>
              <div className="d-flex">
                <div className="mx-2">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    id="exampleColorInput"
                    value={colors.primary}
                    title="Choose your color"
                    onChange={(e) => {
                      const values = { ...colors };
                      values.primary = e.target.value;
                      setColors(values);
                    }}
                  ></input>
                </div>
                <div className="mx-2">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    id="exampleColorInput"
                    value={colors.secondary}
                    title="Choose your color"
                    onChange={(e) => {
                      const values = { ...colors };
                      values.secondary = e.target.value;
                      setColors(values);
                    }}
                  ></input>
                </div>
              </div>
              <div className="form-group  my-4">
                <label htmlFor="inputFonts" className="text-dark">
                  Fonts
                </label>
                <input
                  type="text"
                  className={
                    "p-3 d-flex bg-dark  text-white  rounded focus-none"
                  }
                  style={{ width: "100%" }}
                  id="inputFonts"
                  placeholder="Roboto"
                  onChange={(e) => {
                    const values = { ...fonts };
                    values.primary = e.target.value;
                    setFonts(values);
                  }}
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
                  placeholder="Sans-serif"
                  onChange={(e) => {
                    const values = { ...fonts };
                    values.secondary = e.target.value;
                    setFonts(values);
                  }}
                />
              </div>
              <div className="me-md-4 my-4">
                <label
                  htmlFor="inputMockups"
                  className="text-dark form-label my-4 "
                >
                  Mockups
                </label>
                <div className="d-inline-block">
                  <button
                    className="btn"
                    type="button"
                    sx={{ color: "#182340" }}
                    aria-label="add"
                    component="span"
                    onClick={addMockupInput}
                  >
                    <CgAdd sx={{ width: "40px", height: "40px" }} />
                  </button>
                </div>
                {mockupUrl.map((input, index) => (
                  <div className="d-flex align-items-center" key={index}>
                    {index > 0 && (
                      <div className="">
                        <button
                          onClick={() => removeMockupInput(index)}
                          className="btn"
                          type="button"
                          sx={{ color: "#ec523e" }}
                          aria-label="cancel"
                          component="span"
                        >
                          <MdOutlineCancel
                            sx={{ width: "40px", height: "40px" }}
                          />
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      className="form-control my-3 bg-dark text-white"
                      name="Mockup_Images"
                      placeholder="Upload Mockup Images"
                      onChange={(e) => retrieveMockup(index, e)}
                    />
                  </div>
                ))}
              </div>
            </form>

            <hr />

            <div
              onClick={createBrand}
              className="mt-5 btn d-block btn-lg fw-bold btn-primary p-3"
            >
              Create Brand ✅
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
}
