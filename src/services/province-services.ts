import { AxiosResponse } from "axios";
import http from "@/lib/axios";

export interface ProvincesResponseApi {
  data: [];
}

export const provinceServices = {
  async getProvinces({ token }: { token: string }) {
    const response: AxiosResponse<ProvincesResponseApi> = await http.get(
      `/setupProvinsi/GetAllSetupProvinsi`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },
};
