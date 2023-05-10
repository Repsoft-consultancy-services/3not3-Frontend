import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/Teams.module.css";
import Koala from "../assets/img/noTeams.png";
import Arrow from "../assets/img/noTeamsVector.png";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { AiFillInfoCircle, AiFillCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { CREATE_TEAM, JOIN_TEAM, GET_TEAM } from "../constants/routes";
import withAuth from "../HOC/withAuth";
import axiosinstance from "../util/axiosInstance";
import TeamComponent from "../components/TeamComponent";
import DialogBox from "../components/DialogBox";
import { TiUpload } from "react-icons/ti";
import styless from "../styles/Profile.module.css";
import { getOrientation } from "get-orientation/browser";
import { getCroppedImg, getRotatedImage } from "../util/cropImage";
import { Footer } from "../components/Footer";
import Dialog from "@mui/material/Dialog";

const teams = () => {
  const [joinbox, setJoinbox] = useState("none");
  const [popupbox, setPopupbox] = useState("none");
  const [blur, setBlur] = useState("0px");
  const [editProfile, setEditProfile] = useState("none");
  const [name, setName] = useState([]);
  const [gameName, setGameName] = useState([]);
  const [image, setImage] = useState([]);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [inGameName, setInGameName] = useState("");
  const [inGameId, setInGameId] = useState([]);
  const [teamCode, setTeamCode] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [switcher, setSwitcher] = useState(true);
  const checkBox = () => {
    popupbox === "block" ? setBlur("blur(0px)") : setBlur("blur(5px)");
  };
  const [previewImage, setPreviewImage] = useState(null);
  const [getTeamData, setGetTeamData] = useState([]);

  const createTeam = async () => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("teamLogo", croppedImage);
    formdata.append("gameName", gameName);
    formdata.append("inGameName", inGameName);
    formdata.append("inGameId", inGameId);
    axiosinstance.post(CREATE_TEAM, formdata).then((res) => {
      // console.log("Team Created!", res.data);
      getTeam();
      toast.success("Team Created! now you can join tournament");
      handleReset2();
      handleReset();
      setPopupbox("none");
      checkBox();
      setBlur("blur(0px)");
    });
  };
  useEffect(() => {
    getTeam();
  }, []);
  const handleReset = () => {
    setInGameName("");
    setTeamCode("");
    setGameName("");
    setInGameId("");
  };
  const handleReset2 = (e) => {
    setImage([]);
    setSwitcher(true);
    setCroppedImage();
    setImageSrc(null);
    setPreviewImage(null);
  };
  const getTeam = async () => {
    const { user } = JSON.parse(localStorage.getItem("authUser"));
    // console.log(user?._id);
    axiosinstance.get(`${GET_TEAM}${user._id}`).then((res) => {
      setGetTeamData(res.data.teams);
      // console.log("get teams", res.data);
      handleReset();
    });
  };
  const joinTeam = async () => {
    const { user } = JSON.parse(localStorage.getItem("authUser"));
    console.log(user?._id);
    axiosinstance
      .post(`${JOIN_TEAM}${teamCode}`, {
        inGameName: inGameName,
        inGameId: inGameId,
      })
      .then((res) => {
        // console.log("join teams", res.data);
        console.log("join teams", res.data);
        setJoinbox("none");
        checkBox();
        setBlur("blur(0px)");
        handleReset();
        toast.success("Team Joined!");
        getTeam();
      })
      .catch((err) => {
        toast.error("Cannot Join!", JSON.stringify(err));
      });

    setOpenJoinTeam(false);
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      const reader = new FileReader();
      reader.readAsDataURL(croppedImage);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setOpenTeamLogo(false);
      };
    } catch (e) {}
  }, [imageSrc, croppedAreaPixels, rotation]);
  const ORIENTATION_TO_ANGLE = {
    3: 180,
    6: 90,
    8: -90,
  };
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
    }
  };
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const [openCreateTeam, setOpenCreateTeam] = React.useState(false);
  const [openJoinTeam, setOpenJoinTeam] = React.useState(false);
  const [openTeamLogo, setOpenTeamLogo] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpenCreateTeam(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(getTeamData);
  return (
    <div className={"container"}>
      <Dialog open={openTeamLogo} maxWidth={false}>
        <div className={styless.uploadProfilePic}>
          <span className={styless.boxTitle}>
            <h3>Add photo</h3>
            <i
              onClick={() => {
                setOpenTeamLogo(false);
                handleReset2();
              }}
            >
              <ImCross />
            </i>
          </span>
          <div className={styless.cbox}>
            <center>
              {previewImage !== null ? (
                <img className={styless.profilePhoto} src={previewImage} />
              ) : (
                " "
              )}
            </center>
            {imageSrc && (
              <div className={styless.cropper}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
            )}

            <center>
              {switcher && (
                <>
                  <label htmlFor="file" style={{ position: "relative" }}>
                    <input
                      type="file"
                      onChange={onFileChange}
                      accept="image/*"
                      className={styless.inputFile}
                    />
                    <p className={styless.inputFileLable}>
                      <i>
                        <TiUpload />
                      </i>
                      Choose Image
                    </p>
                  </label>
                </>
              )}
              {imageSrc && (
                <button
                  onClick={showCroppedImage}
                  variant="contained"
                  color="primary"
                >
                  Crop
                </button>
              )}
            </center>
          </div>
        </div>
      </Dialog>

      <DialogBox
        executeFunction={createTeam}
        open={open}
        button={"Create Team"}
        setOpen={setOpen}
        handleClose={handleClose}
      />

      {/* create team */}
      <Dialog open={openCreateTeam}>
        <div className={styles.createTeamPopup}>
          <div>
            <h2>Create your team</h2>
            <label htmlFor="TeamName">Team Name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Enter your team name"
            />
            <label htmlFor="GameName">Game Name</label>
            <br />
            <select
              // value={gameName}
              name="gameName"
              id="games"
              onChange={(e) => {
                setGameName(e.target.value);
              }}
            >
              <option value="select">Select Game</option>
              <option value="Valorant">Valorant</option>
              <option value="BGMI">BGMI</option>
              {/* <option value="PUBG">PUBG</option> */}
              <option value="Clash Of Clans">Clash of clans</option>
              <option value="Call Of Duty Mobile">Call Of Duty Mobile</option>
              <option value="FreeFire">Free fire</option>
              <option value="FreeFire">Counter strike global offensive</option>
              <option value="FreeFire">Call Of Duty warzone 2</option>
              <option value="FreeFire">PUGB PC version</option>
              <option value="FreeFire">Apex legends</option>
              <option value="FreeFire">Fortnite</option>
              <option value="FreeFire">Rogue Company</option>
            </select>
            <br />
            <label htmlFor="ingameName">In-game Name</label>
            <input
              value={inGameName}
              onChange={(e) => {
                setInGameName(e.target.value);
              }}
              type="text"
              placeholder="Your in game name"
            />
            <label htmlFor="In-game-ID">In-game Id</label>
            <input
              value={inGameId}
              onChange={(e) => {
                setInGameId(e.target.value);
              }}
              type="text"
              placeholder="Game Id"
            />
          </div>
          <div className={styles.logoSide}>
            <div>
              <h2>
                <i className={styles.infoIcon}>
                  <AiFillInfoCircle />
                </i>
                Team Logo
              </h2>
              <div className={styles.teamLogoBox}>
                <i onClick={() => setOpenTeamLogo(true)}>
                  <TiUpload />
                </i>

                {previewImage !== null ? (
                  <img className={styless.profilePhoto} src={previewImage} />
                ) : (
                  " "
                )}
                {/* <button>Upload</button> */}
              </div>
            </div>
            <div style={{ marginBottom: ".6rem" }}>
              <button
                style={{
                  background: "transparent",
                  border: "solid 1.5px white",
                }}
                onClick={() => {
                  setOpenCreateTeam(false);
                  checkBox();
                  handleReset();
                  handleReset2();
                }}
              >
                Cancel
              </button>
              <button onClick={handleClickOpen}>Create Team</button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* join team */}
      <Dialog open={openJoinTeam}>
        <div className={styles.joinTeam}>
          <h2>JOIN TEAM</h2>
          <p>Join the team</p>
          <span>
            <label htmlFor="TeamCode">Team Code*</label>
            <input
              value={teamCode}
              onChange={(e) => {
                setTeamCode(e.target.value);
              }}
              name="TeamCode"
              type="text"
              placeholder="Enter team code here"
            />
          </span>
          <span>
            <label htmlFor="IGN">In-game Name*</label>
            <input
              value={inGameName}
              onChange={(e) => {
                setInGameName(e.target.value);
              }}
              name="IGN"
              type="text"
              placeholder="Enter in-game name"
            />
          </span>
          <span>
            <label htmlFor="IG_id">In-game id*</label>
            <input
              value={inGameId}
              onChange={(e) => {
                setInGameId(e.target.value);
              }}
              name="IG_id"
              type="text"
              placeholder="Enter your in game Id"
            />
          </span>
          <div className={styles.joinSelection}>
            <button
              id={styles.joinCancel}
              onClick={() => {
                setOpenJoinTeam(false);
                checkBox();
                handleReset();
              }}
            >
              Cancel
            </button>
            <button onClick={joinTeam} id={styles.joinNow}>
              Join team
            </button>
          </div>
        </div>
      </Dialog>

      <div className={styles.teamsContainer}>
        <div className={styles.teamsRow}>
          <h3>My Teams</h3>
          <div>
            <button
              className={styles.teamsButton}
              onClick={() => setOpenJoinTeam(true)}
            >
              Join Team
            </button>
            <button
              className={styles.teamsButton}
              onClick={() => setOpenCreateTeam(true)}
            >
              Create Team
            </button>
          </div>
        </div>
        <div>
          {getTeamData?.length !== 0 ? (
            <TeamComponent data={getTeamData} />
          ) : (
            <center>
              <div className={styles.teamsImages}>
                {/* {console.log("working")} */}
                <div className={styles.koala}>
                  <Image src={Koala} height={350} width={450} />
                </div>
                <div className={styles.arrow}>
                  <Image src={Arrow} />
                </div>
              </div>
              <p className={styles.teamsText}>
                You don’t have any teams yet, click create team to create your
                team.
              </p>
            </center>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(teams);
