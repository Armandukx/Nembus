var changingIcon = false;

async function fetchServerStats() {
  try {
      const response = await fetch('https://api.battlemetrics.com/servers/26957610');
      const data = await response.json();
      updateStats(data.data.attributes);
  } catch (error) {
      console.error('Error fetching server stats:', error);
  }
}

function updateStats(data) {
  const maxPlayers = parseInt(data.maxPlayers);
  const activePlayers = parseInt(data.players);
  const progress = document.querySelector('.progress');
  const progressBar = document.querySelector('.progress-grey');
  
  document.getElementById('maxPlayers').textContent = maxPlayers;
  document.getElementById('activePlayers').textContent = activePlayers;
  document.getElementById('serverName').textContent = data.name;
  const progressPercentage = (activePlayers / maxPlayers) * 100;
  progress.style.width = progressPercentage + '%';
}

window.onload = function() {
  fetchServerStats();
  setInterval(fetchServerStats, 60000);
};

function copyToClipboard(element) {
  if (changingIcon) return;
  changingIcon = true;
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
  var $button = $(".copy_button");
  $button.find("i").removeClass("fa-regular").addClass("fa-solid");
  setTimeout(function() {
      $button.find("i").removeClass("fa-solid").addClass("fa-regular");
      changingIcon = false; // Reset the flag after changing back
  }, 100);
}

function openInSameWindow(url) {
  window.location.href = url;
}