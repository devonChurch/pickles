const fs = require("fs");
const path = require("path");

const filePaths = Array.from({ length: 3 }).map((_, index) => 
    path.resolve(__dirname, `file-${index + 1}.txt`)
);

// Basic: sequential...
{
    const [filePath1, filePath2, filePath3] = filePaths;

    // One.
    fs.readFile(filePath1, (error, fileData1) => {
        if (error) { throw new Error(error); }

        // Two.
        fs.readFile(filePath2, (error, fileData2) => {
            if (error) { throw new Error(error); }

            // Three.
            fs.readFile(filePath3, (error, fileData3) => {
                if (error) { throw new Error(error); }

                console.log(filePath1, fileData1.toString());
                console.log(filePath2, fileData2.toString());
                console.log(filePath3, fileData3.toString());
            })
        })
    })
}

// Dynamic: read x files...
{
    const getAllFileData = (allFilePaths, completeCallback) => {

        // Recursively iterate through the supplied file array upon each successful callback.
        const recursiveFileRequest = (filePathIndex, allFileData) => {
            const filePath = allFilePaths[filePathIndex];
            const shouldFetchNextFile = allFilePaths.length >= filePathIndex + 1;

            if (shouldFetchNextFile) {
                fs.readFile(filePath, (error, fileData) => {
                    if (error) { throw new Error(error); }
                    allFileData[filePath] = fileData.toString();
                    const hasAllFileData = Object.keys(allFileData).length === allFilePaths.length;
                    hasAllFileData ? completeCallback(allFileData) : recursiveFileRequest(filePathIndex + 1, allFileData)
                })
            }
        }
        recursiveFileRequest(0, {});
    }

    getAllFileData(filePaths, (fileData) => console.log("DONE!", fileData))

}