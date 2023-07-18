import axios from "axios";
import store from "@/store";

export async function updateToken(refreshToken: string) {
  try {
    const response = await axios.post(
      "https://poker.evenbetpoker.com/api/web/auth/token?clientId=default",
      {
        clientId: "default",
        refreshToken,
      }
    );

    localStorage.setItem("refresh-token", response.data["refresh-token"]);
    store.commit("logIn", response.data.token);

    setTimeout(() => {
      updateToken(response.data["refresh-token"]);
    }, 800000);
  } catch (error) {
    localStorage.removeItem("refresh-token");
    store.commit("logOut");
  }
}
