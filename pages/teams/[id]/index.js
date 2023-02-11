import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "../../../styles/Teams.module.css";
import { ImBin2 } from "react-icons/im";
import { Playercard } from "../../../components/Playercard";
import { useRouter } from "next/router";
import {
  DELETE_TEAM,
  GET_INDIVIDUAL_TEAM,
  INVITE_PLAYER,
  UPDATE_TEAM_DATA,
} from "../../../constants/routes";
import { toast } from "react-toastify";
import { useStateValue } from "../../../Context/StateProvider";
import axiosinstance from "../../../util/axiosInstance";
import DialogBox from "../../../components/DialogBox";
import axios from "axios";
import { Loader } from "../../../components/Loader";
import { Footer } from "../../../components/Footer";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Cropper from "react-easy-crop";
import { TiUpload } from "react-icons/ti";
import { getOrientation } from "get-orientation/browser";
import { getCroppedImg, getRotatedImage } from "../../../util/cropImage";
import styless from "../../../styles/Profile.module.css";

const teams = ({ team }) => {
  const [{ user }, dispatch] = useStateValue();

  const [inviteEmail, setInviteEmail] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamImage, setTeamImage] = useState();
  const [loading, setLoading] = useState(true);
  const [eachTData, setEachTData] = useState([]);
  const router = useRouter();
  const paramURL = router.query;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [teamData, setTeamData] = useState([]);

  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [switcher, setSwitcher] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState([]);

  const invitePlayer = async () => {
    const res = await axiosinstance
      .post(`${INVITE_PLAYER}`, {
        inviteEmail: inviteEmail,
        teamId: paramURL.id,
      })
      .then((res) => {
        toast.success("Invitation Send!");
      })
      .catch((err) => {
        toast.error("Cannot Send Invitation!");
      });
  };
  const deleteTeam = async () => {
    await axiosinstance
      .post(`${DELETE_TEAM}${paramURL.id}`)
      .then((res) => {
        router.push("/teams");
        toast.success("Team Deleted!");
      })
      .catch((err) => {
        toast.error("Cannot Delete!");
      });
  };

  const changeTeamData = () => {
    const formdata = new FormData();
    formdata.append("name", teamName);
    formdata.append("teamLogo", croppedImage);
    axiosinstance
      .post(`${UPDATE_TEAM_DATA}/${paramURL.id}`, formdata)
      .then((res) => {
        // console.log(res.data);
        toast.success("Team Updated");
        getAllData();
        setTeamName(eachTData?.team ? eachTData.team.name : team.team.name);
        handleReset2();
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleReset2 = (e) => {
    setImage([]);
    setSwitcher(true);
    setCroppedImage();
    setImageSrc(null);
    setPreviewImage(null);
    handleClose2();
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

  const checkLeader = () => {
    if (team.team.createdBy._id === user?.user?._id) {
      return true;
    }
    return false;
  };
  const checkMember = () => {
    // console.log(eachTData.team.members);
    const result = eachTData.team.members.find(
      ({ member }) => member._id === user?.user?._id
    );
    // console.log(result);
    if (result === undefined) {
      return false;
    }
    return true;
  };
  // console.log(user);
  const getAllData = () => {
    axios.get(GET_INDIVIDUAL_TEAM + `${paramURL.id}`).then((res) => {
      setEachTData(res.data);
      setTeamName(eachTData?.team ? eachTData.team.name : team.team.name);
      setTeamImage(team.team.teamLogo);
      setLoading(false);
    });
  };
  useEffect(() => {
    getAllData();
  }, []);

  // if (user === null) return <p>No User data</p>;
  if (loading)
    return (
      <>
        <center>
          <Loader />
        </center>
      </>
    );
  if (!eachTData) return <p>No profile data</p>;
  return (
    <div className={"container"}>
      <div className={styles.teamsContainer}>
        <DialogBox
          executeFunction={deleteTeam}
          open={open}
          setOpen={setOpen}
          button="Delete Team"
          handleClose={handleClose}
        />{" "}
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={open2}
          onClose={handleClose2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            sx={{
              color: "#1b86ed !important",
            }}
            id="alert-dialog-title"
          >
            {"Edit your Team Details"}
          </DialogTitle>
          <DialogContent>
            <>
              <label>Edit Team Name</label>
              <input
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                }}
                type="text"
                required
              />
            </>
            {previewImage === null ? (
              <>
                <div className={styless.cbox}>
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

                  <center className={styles.choosePic}>
                    {switcher && (
                      <>
                        <label htmlFor="file" style={{ position: "relative" }}>
                          <input
                            type="file"
                            onChange={onFileChange}
                            accept="image/*"
                          />
                          Edit logo
                        </label>
                      </>
                    )}
                    {imageSrc && (
                      <button
                        onClick={showCroppedImage}
                        className={styles.cropButtonEditTeam}
                      >
                        Crop
                      </button>
                    )}
                    {/* {croppedImage && <button onClick={saveProfile}>Save</button>} */}
                  </center>
                </div>
              </>
            ) : (
              <center>
                {previewImage !== null ? (
                  <img className={styless.profilePhoto} src={previewImage} />
                ) : (
                  " "
                )}
              </center>
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleReset2}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={changeTeamData} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <h1>Team Info</h1>
        <div className={styles.innerbox}>
          <div className={styles.acBox1}>
            <div className={styles.tourneyImage}>
              {/* <Image src={team.team.teamLogo} layout="fill" /> */}
              <Image
                src={
                  eachTData?.team ? eachTData.team.teamLogo : team.team.teamLogo
                }
                layout="fill"
              />
            </div>
            <div className={styles.tourneyTxt}>
              <h3>
                Team Name:{" "}
                {eachTData?.team ? eachTData.team.name : team.team.name}
              </h3>
              <section>
                <div>
                  <p className={styles.eh}>Leader</p>
                  <p>@{team.team.members[0].inGameName}</p>
                </div>
                <div>
                  <p className={styles.eh}>Played</p>
                  <p>{team.team.wins + team.team.loses}</p>
                </div>
                <div>
                  <p className={styles.eh}>Won</p>
                  <p>{team.team.wins}</p>
                </div>
                {/* <div>
                  <p className={styles.eh}>Win Rate</p>
                  <p>83%</p>
                </div> */}
                {checkMember() ? (
                  <div>
                    <p className={styles.eh}>Team Code</p>
                    <p>{team.team.teamCode}</p>
                  </div>
                ) : (
                  ""
                )}
                {checkLeader() ? (
                  <div className={styles.editTeamButtons}>
                    <button onClick={handleClickOpen2}>EDIT</button>
                    <button onClick={handleClickOpen}>
                      <ImBin2 />
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </section>
            </div>
            {checkLeader() ? (
              <i onClick={handleClickOpen}>
                <ImBin2 />
              </i>
            ) : (
              ""
            )}
          </div>

          <div className={styles.acBox2}>
            <div className={styles.playerSearch}>
              <p className={styles.headings}>Team Players</p>
              {checkMember() ? (
                <div>
                  <input
                    value={inviteEmail}
                    onChange={(e) => {
                      setInviteEmail(e.target.value);
                    }}
                    name="inviteFriend"
                    type="text"
                    placeholder="Enter Email"
                  />
                  <button onClick={invitePlayer}>Invite</button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.teamPlayers}>
              {eachTData.team.members.map((members, index) => (
                <Playercard
                  getAllData={getAllData}
                  leader={team.team.createdBy._id}
                  members={members}
                  userId={user?.user?._id}
                  key={index}
                  teamID={paramURL.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export const getServerSideProps = async (context) => {
  const res = await fetch(GET_INDIVIDUAL_TEAM + `${context.params.id}`);

  const team = await res.json();

  return {
    props: {
      team,
    },
  };
};

export default teams;
