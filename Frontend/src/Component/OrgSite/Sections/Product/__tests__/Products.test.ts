import axios from "axios";
import apiRoutes from "../../../../../Constants/apiRoutes";

test("should recive status code 200", async () => {
  try {
    const res = await axios.get(apiRoutes.getProducts);
    expect(res.status).toBe(200);
    expect(res.data.products).toBeInstanceOf(Object);
  } catch (error: any) {
    expect(error.message).toBe("Network Error");
  }
},10000);  
