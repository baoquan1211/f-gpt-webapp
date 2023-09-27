import { DownloadIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getStrpdf } from "../../../../../services/Chat/index";
import LoadingIcons from "react-loading-icons";
import { saveAs } from "file-saver";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ExportButton = ({ conversation, conversationID, conversationName }) => {
  const user = useSelector((state) => state.auth);
  const [pdfData, setPdfData] = useState(null);

  const exportTxtHandle = () => {
    let text = "";
    conversation.forEach((element) => {
      if (element.role === "user") text += user.username + ":" + "\n";
      else text += element.role + ":" + "\n";
      text += element.content + "\n";
    });
    var blob = new Blob([text], { type: "text/plain ; charset=utf-8" });
    saveAs(blob, `${conversationName}.txt`);
  };

  const exportPdfHandle = () => {
    const fetchData = (id) => {
      getStrpdf(id, user.access).then((data) => {
        setPdfData(data);
        if (conversationID) {
          if (window.innerWidth < 768) {
            const pdfBlob = new Blob([data], { type: "application/pdf" });
            saveAs(pdfBlob, "file.pdf");
          }
        }
      });
    };
    fetchData(conversationID);
  };
  const exportJsonHandle = () => {
    var jsonstr = JSON.stringify(conversation);
    var blob = new Blob([jsonstr], { type: "application/json" });
    saveAs(blob, `${conversationName}.json`);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DownloadIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Export File</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button
              className="w-full text-start cursor-pointer"
              onClick={exportTxtHandle}
            >
              Text
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {window.innerWidth < 768 ? (
              <button className="w-full text-start" onClick={exportPdfHandle}>
                PDF
              </button>
            ) : (
              <DialogTrigger
                className="w-full text-start cursor-pointer"
                onClick={exportPdfHandle}
              >
                PDF
              </DialogTrigger>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              className="w-full text-start cursor-pointer"
              onClick={exportJsonHandle}
            >
              Json
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="p-8">
        {pdfData !== null ? (
          <iframe
            src={URL.createObjectURL(pdfData)}
            className="h-[80dvh] w-full"
          />
        ) : (
          <div className="flex justify-center items-center">
            <LoadingIcons.Puff
              stroke="black"
              fill="gray"
              className="w-1/2 h-1/2"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExportButton;
