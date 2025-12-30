const output = document.getElementById("output");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);

    img.onerror = () => {
      reject(new Error(`Image failed to download: ${url}`));
    };

    img.src = url;
  });
}

function downloadImages() {
  // Reset UI
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

  const promises = images.map(img => downloadImage(img.url));

  Promise.all(promises)
    .then((imgs) => {
      imgs.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      errorDiv.textContent = err.message;
    })
    .finally(() => {
      loadingDiv.style.display = "none";
    });
}
