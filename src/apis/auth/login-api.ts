import http from "@/lib/axios";

export interface LoginApiHandlerResponse {
  token: string;
}

export const loginApiHandler = async (body: {
  user_name: string;
  password: string;
}): Promise<LoginApiHandlerResponse> => {
  const { data } = await http.post("/login", body);
  return data;
};
