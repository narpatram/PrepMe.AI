import { useMutation, useQuery } from "@tanstack/react-query";
import { getDownloadUrl, uploadFile } from "../apis";

export const useFileUpload = () => {
  return useMutation({
    mutationFn: uploadFile,
  });
};

export const useDownloadUrl = (fileName: string) => {
  return useQuery({
    queryKey: ["downloadUrl", fileName],
    queryFn: () => getDownloadUrl(fileName),
    enabled: !!fileName, // Fetch only when fileName exists
  });
};
