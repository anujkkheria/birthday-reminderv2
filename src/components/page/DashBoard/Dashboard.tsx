import React, { ChangeEvent, useEffect, useState, useContext } from "react";
import { userContext } from "../../../context/user";
import { Button, IconButton, TextField } from "@mui/material";
import { Add, Close, Camera, Delete } from "@mui/icons-material";
import data from "../../../assets/data";

const Dashboard: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { state } = useContext(userContext);
  const ButtonStyle = {
    height: "65px",
    bgcolor: "orange",
    "&:hover": { bgcolor: "orange", opacity: "0.9" },
  };

  const [Data, setData] = useState<any>([]);

  const [addNew, setAddNew] = useState<boolean>(false);

  const [newFriend, setNewFriend] = useState<any>({});

  useEffect(() => {
    setData([...data]);
    console.log(state);
  }, []);

  useEffect(() => {
    console.log(Data);
  }, [Data]);

  const click_Image = () => {
    const avatar_img = document.querySelector("#image") as HTMLInputElement;
    avatar_img.click();
  };

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const base64 = file && (await convertToBase64(file));
    setNewFriend({ ...newFriend, image: base64 });
    //  base64 && setfile(base64)
    console.log(base64);
  };

  const friendInfoChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value });
    console.log(newFriend);
  };
  const addingNewFriend = () => {
    fetch(`${BASE_URL}/friends/createnew`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newFriend, userID: state.id }),
    });
    newFriend.image &&
      newFriend.age &&
      newFriend.name &&
      setData([...Data, newFriend]);
    console.log(newFriend);
    setNewFriend({});
    setAddNew((prev) => !prev);
  };

  const Deletefriend = (id: string) => {
    const newData = Data.filter((item: any) => item.id !== id);
    setData(newData);
    console.log(id, newData);
    // fetch(`http://127.0.0.1:3000/friends/friend=${id}`,{
    //   method:"DELETE"
    // })
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
    });
  };

  return (
    <div className=" w-full h-full flex justify-center items-center bg-orange-200">
      <div className=" w-1/3 h-3/4 flex flex-col bg-slate-50 shadow-md shadow-gray-500 items-center gap-2 justify-center p-4">
        <div className="w-full max- h-full overflow-y-scroll overflow-x-hidden">
          {Data.map((item: any) => (
            <article key={item.id} className="w-full flex m-2">
              <div className="w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className=" w-20 h-20 rounded-[50%] object-cover shadow-sm shadow-orange-500"
                />
              </div>
              <div className=" w-full flex flex-col lg:-m-40 justify-center">
                <h4 className=" mb-2">{item.name}</h4>
                <p className="mb-0">{item.age} years</p>
              </div>
              <div className="w-full flex justify-center items-center">
                <Button
                  sx={{ color: "orangered" }}
                  onClick={() => Deletefriend(item.id)}
                >
                  <Delete />
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className="w-full flex flex-col gap-2 px-2">
          {addNew ? (
            <article className="w-full flex gap-4 m-2">
              <div
                className=" relative w-20 h-20 rounded-[50%] bg-gray-200"
                onClick={() => click_Image()}
              >
                <input
                  className="hidden"
                  type="file"
                  id="image"
                  accept="image"
                  onChange={(e) => fileChange(e)}
                />
                {!newFriend.image ? (
                  <IconButton
                    aria-describedby="image"
                    sx={{
                      position: "absolute",
                      top: 2,
                      bottom: 2,
                      right: 2,
                      left: 2,
                    }}
                  >
                    <Camera />
                  </IconButton>
                ) : (
                  <img
                    src={newFriend.myFile}
                    alt=""
                    className="h-full w-full rounded-[50%] object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <TextField
                  placeholder="name"
                  size={"small"}
                  name="name"
                  onChange={(e) => friendInfoChange(e)}
                  type={"text"}
                />
                <TextField
                  placeholder="age"
                  size="small"
                  name="age"
                  onChange={(e) => friendInfoChange(e)}
                  type={"number"}
                />
              </div>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "orange",
                  borderRadius: "50%",
                  width: "15%",
                  height: "80%",
                  "&:hover": { bgcolor: "orange", opacity: "0.9" },
                }}
                onClick={() => addingNewFriend()}
              >
                <Add />
              </Button>
              <IconButton
                sx={{
                  borderRadius: "50%",
                  width: "15%",
                  height: "80%",
                  color: "orangered",
                }}
                onClick={() => setAddNew((prev) => !prev)}
              >
                <Close />
              </IconButton>
            </article>
          ) : (
            <Button
              variant="contained"
              sx={ButtonStyle}
              fullWidth
              onClick={() => setAddNew((prev) => !prev)}
            >
              Add new
            </Button>
          )}
          <Button variant="contained" sx={ButtonStyle} fullWidth>
            Delete All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
