document.addEventListener('DOMContentLoaded', () => {
  let h3 = document.querySelector('.audio div h3')
  let playBtn = document.querySelectorAll('.fa-play')
  let prevBtn = document.querySelectorAll('.fa-caret-left')
  let nextBtn = document.querySelectorAll('.fa-caret-right')
  let mainSong = document.querySelector('.play audio')
  let audioPage = document.querySelector('.headphones')
  let videoPage = document.querySelector('.file-video')
  let playInterface = document.querySelector('.play')
  let playAud = document.querySelector('.play audio')
  let videoP = document.querySelector('.video')
  let audioP = document.querySelector('.audio')
  let settingsP = document.querySelector('.settings')
  let playP = document.querySelector('.play')
  let mainvid = document.querySelector('.video main video')
  let audH3 = document.querySelectorAll('.audio-name')
  let vid = document.querySelectorAll('.vid')
  let playName = document.querySelector('.playName')
  let progress = document.querySelector('#progress')
  let songList = document.querySelectorAll('.aud')
  let header = document.querySelector('header')
  let footer = document.querySelector('footer')
  let bgI = document.querySelectorAll('.bg i')
  let audioName = document.querySelectorAll('.audio-name')

  audioName.forEach(element => {
    element.innerHTML = decodeURI(
      element.parentElement.children[0].src.split('/').pop()
    )
  })

  bgI.forEach(element => {
    element.addEventListener('click', () => {
      backGroundChange()
    })
  })
  function backGroundChange () {
    document.body.classList.toggle('light')
    document.body.classList.toggle('dark')
  }

  mainvid.addEventListener('click', () => {
    if (mainvid.paused || mainvid.ended) {
      mainvid.play()
    } else {
      mainvid.pause()
    }
  })
  prevBtn.forEach(btn => {
    btn.addEventListener('click', prev)
  })
  nextBtn.forEach(btn => {
    btn.addEventListener('click', next)
  })
  function prev () {
    if (audioPage.classList.contains('activated')) {
      let currentSource = mainSong.src.split('/').pop()
      for (let i = 0; i < songList.length; i++) {
        let listItem = songList[i]
        if (
          currentSource ===
          listItem.children[0].getAttribute('src').split('/').pop()
        ) {
          mainSong.pause()
          mainSong.src = ''
          let prevSource = listItem.previousElementSibling
            ? listItem.previousElementSibling.children[0].getAttribute('src')
            : songList[songList.length - 1].children[0].getAttribute('src')
          h3.innerHTML = prevSource.split('/').pop()
          mainSong.src = prevSource
          mainSong.play()
          break
        }
      }
    } else if (videoPage.classList.contains('activated')) {
      vid.forEach(element => {
        if (element.children[0].src === mainvid.src) {
          let aux = element.lastElementSibling.children[0].src
          mainvid.src = aux
        }
      })
    }
  }
  function next () {
    if (audioPage.classList.contains('activated')) {
      let currentSource = mainSong.src.split('/').pop()
      for (let i = 0; i < songList.length; i++) {
        let listItem = songList[i]
        if (
          currentSource ===
          listItem.children[0].getAttribute('src').split('/').pop()
        ) {
          mainSong.pause()
          mainSong.src = ''
          let nextSource = listItem.nextElementSibling
            ? listItem.nextElementSibling.children[0].getAttribute('src')
            : songList[0].children[0].getAttribute('src')
          h3.innerHTML = nextSource.split('/').pop()
          playName.innerHTML = nextSource.split('/').pop()
          mainSong.src = nextSource
          mainSong.play()
          break
        }
      }
    } else if (videoPage.classList.contains('activated')) {
    }
  }
  audioPage.classList.add('activated')
  vid.forEach(element => {
    element.children[1].innerHTML = element.children[0].children[0]
      .getAttribute('src')
      .split('/')
      .pop()
    element.children[1].style =
      ' display: flex; text-align: center; font-size: bold; flex-wrap: wrap;'
    element.addEventListener('click', () => {
      h3.innerHTML = element.children[0].children[0]
        .getAttribute('src')
        .split('/')
        .pop()
      mainvid.src = element.children[0].children[0].getAttribute('src')
      mainvid.parentElement.children[1].innerHTML =
        element.children[0].children[0].getAttribute('src').split('/').pop()
      mainvid.parentElement.classList.remove('display')
      mainvid.pause()
      if (element.children[0].children[0].paused) {
        mainvid.play()
      } else {
        mainvid.pause()
      }
    })
  })
  audH3.forEach(element => {
    element.addEventListener('click', e => {
      if (e.target.nodeName === 'H3') {
        h3.innerHTML = e.target.innerHTML
        mainSong.src = e.target.parentElement.children[0].getAttribute('src')
        playBtn.forEach(element => {
          element.setAttribute('class', 'fa-regular fa-circle-pause fa-2xl')
        })
      }
      playName.innerHTML = playAud.src.split('/').pop()
      mainSong.play()
    })
  })
  mainSong.addEventListener('play', () => {
    playBtn.forEach(element => {
      element.setAttribute('class', 'fa-regular fa-circle-pause fa-2xl')
    })
  })
  mainSong.addEventListener('pause', () => {
    playBtn.forEach(element => {
      element.setAttribute('class', 'fa-regular fa-circle-play fa-2xl')
    })
  })
  document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.key === ' ' || event.code === 'SPACE') {
      if (audioPage.classList.contains('activated')) {
        mainvid.pause()
        if (mainSong.ended || mainSong.paused) {
          mainSong.play()
          playBtn.forEach(element => {
            element.setAttribute('class', 'fa-regular fa-circle-pause fa-2xl')
          })
        } else {
          mainSong.pause()
          playBtn.forEach(element => {
            element.setAttribute('class', 'fa-regular fa-circle-play fa-2xl')
          })
        }
      } else if (videoPage.classList.contains('activated')) {
        mainSong.pause()
        if (mainvid.ended || mainvid.paused) {
          mainvid.play()
          playBtn.forEach(element => {
            element.setAttribute('class', 'fa-regular fa-circle-pause fa-2xl')
          })
        } else {
          mainvid.pause()
          playBtn.forEach(element => {
            element.setAttribute('class', 'fa-regular fa-circle-play fa-2xl')
          })
        }
      }
    } else if (event.key === 'ArrowRight') {
      mainSong.currentTime += 2
      mainvid.currentTime += 2
    } else if (event.key === 'ArrowLeft') {
      mainSong.currentTime -= 2
      mainvid.currentTime -= 2
    } else if (event.key === 'ArrowUp') {
      mainvid.volume += 0.1
      mainSong.volume += 0.1
    } else if (event.key === 'ArrowDown') {
      mainvid.volume -= 0.1
      mainSong.volume -= 0.1
    }
  })
  playBtn.forEach(element => {
    element.addEventListener('click', () => {
      if (mainSong.src === '') {
        mainSong.src =
          'assets/andy_grammer_don_t_give_up_on_me_official_video_from_the_five_feet_apart_fi_h264_72676_113316.mp3'
      }
      if (mainSong.ended || mainSong.paused) {
        mainSong.play()
        element.setAttribute('class', 'fa-regular fa-circle-pause fa-2xl')
      } else {
        mainSong.pause()
        element.setAttribute('class', 'fa-regular fa-circle-play fa-2xl')
      }
    })
  })
  mainSong.addEventListener('timeupdate', () => {
    progress.value = mainSong.currentTime
  })
  progress.addEventListener('input', () => {
    mainSong.currentTime = progress.value
  })
  function displayChange (e) {
    if (e) {
      let siblings = Array.from(e.parentElement.children)
      siblings.forEach(sibling => {
        sibling.classList.add('display')
      })
      videoPage.classList.remove('activated')
      audioPage.classList.remove('activated')
    }
    footer.classList.remove('display')
    header.classList.remove('display')
    e.classList.remove('display')
  }
  audioPage.addEventListener('click', () => {
    displayChange(audioP)
    mainvid.pause()
    audioPage.classList.add('activated')
  })
  videoPage.addEventListener('click', () => {
    displayChange(videoP)
    mainSong.pause()
    videoPage.classList.add('activated')
  })
  h3.addEventListener('click', () => {
    if (h3 && playInterface) {
      let siblings = Array.from(playInterface.parentElement.children)
      siblings.forEach(sibling => {
        sibling.classList.add('display')
      })
      playP.classList.remove('display')
      playInterface.classList.remove('display')
      audioP.classList.add('display')
      //h3.parentElement.parentElement.classList.remove('display')
      header.classList.remove('display')
      footer.classList.remove('display')
    }
  })
})
