async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];

  if (!file) {
    alert("Select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "media-upload");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dsjcrmabo/upload",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();

  console.log("Cloudinary response:", data);
console.log("Error message:", data.error?.message);

  if (!res.ok || !data.secure_url) {
    alert(data.error?.message || "Upload failed");
    return;
  }

  const url = data.secure_url;

  document.getElementById("link").innerHTML =
    `<a href="${url}" target="_blank">Open Media Link</a>`;

  const preview = document.getElementById("preview");

  if (file.type.startsWith("image")) {
    preview.innerHTML = `<img src="${url}">`;
  } else if (file.type.startsWith("video")) {
    preview.innerHTML = `<video src="${url}" controls></video>`;
  } else if (file.type.startsWith("audio")) {
    preview.innerHTML = `<audio src="${url}" controls></audio>`;
  }
}