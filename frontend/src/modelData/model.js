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