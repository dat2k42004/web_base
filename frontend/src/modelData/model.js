export const userListModel = async () => {
     try {
          const response = await fetch("http://localhost:8080/users/list");
          if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
          }
          // console.log(response.json());
          const data = await response.json();
          console.log(data);
          return data;
     } catch (error) {
          console.log(error);
          return 0;
     }
};

export const userModel = async (userId) => {
     try {
          const response = await fetch(`http://localhost:8080/users/${userId}`);
          // console.log("response : ", response);
          if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data;
     } catch (error) {
          console.log(error);
          return 0;
     }
};

export const photoOfUserModel = async (userId) => {
     try {
          const response = await fetch(`http://localhost:8080/photos/${userId}`);
          if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data;
     } catch (error) {
          console.log(error);
          return 0;
     }
};

export const schemaModel = async () => {
     try {
          const response = await fetch("http://localhost:8080/test/info");
          if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          return data;
     } catch (error) {
          console.log(error);
          return 0;
     }
};

export const LoginModel = async (payload) => {
     try {
          const response = await fetch("http://localhost:8080/users/login", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",  // fixed typo here
               },
               credentials: "include",  // added to allow cookies/session to work
               body: JSON.stringify(payload)
          });

          console.log("response", response);

          if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data.error) {
               throw new Error(data.error);  // fixed typo from data.erro
          }

          return data;
     } catch (error) {
          console.error(error);
          return 0;
     }
};


export const AddComment = async (photo_id, payload) => {
     try {
          console.log("payload: ", payload);
          const response = await fetch(`http://localhost:8080/photos/comment/${photo_id}`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(payload),
               credentials: "include",  // added to allow cookies/session to work
          });
          console.log("response: ", response);
          if (!response.ok) {
               throw new Error('HTTP error! status: ' + response.status);
          }

     } catch (error) {
          console.log(error);
          return 0;
     }
};

export const AddPhoto = async (payload) => {
     try {
          const response = await fetch("http://localhost:8080/photos/new", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(payload),
               credentials: "include",  // added to allow cookies/session to work
          });

          if(!response.ok) {
               throw new Error("HTTP error! status: " + response.status);
          }
     } catch (error) {
          console.log(error);
          return 0;
     }
}

export const RegisterModel = async (payload) => {
     try {
          console.log("payloaduser: ", payload);
          const response = await fetch("http://localhost:8080/users/register", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(payload),
               credentials: "include",  // added to allow cookies/session to work
          })

          if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
          }
     } catch (error) {
          console.log(error);
          return 0;
          
     }
}