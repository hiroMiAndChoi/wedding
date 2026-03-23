document.addEventListener('DOMContentLoaded', function () {
  // 계좌번호 복사
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const account = button.dataset.account;

      try {
        await navigator.clipboard.writeText(account);
        const originalText = button.textContent;
        button.textContent = '복사되었습니다';
        setTimeout(() => {
          button.textContent = originalText;
        }, 1500);
      } catch (e) {
        alert('복사에 실패했습니다. 직접 복사해주세요.');
      }
    });
  });

  // 앨범 모달
  const albumModal = document.getElementById('albumModal');
  const albumModalImg = document.getElementById('albumModalImg');
  const coupleElement = document.querySelector('.couple');

  function openAlbumModal(imageSrc) {
    if (!albumModal || !albumModalImg) return;

    albumModalImg.src = imageSrc;
    albumModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeAlbumModal() {
    if (!albumModal || !albumModalImg) return;

    albumModal.classList.remove('show');
    albumModalImg.src = '';
    document.body.style.overflow = '';
  }

  function scrollToCoupleAndOpen(imageSrc) {
    if (!coupleElement) {
      openAlbumModal(imageSrc);
      return;
    }

    const rect = coupleElement.getBoundingClientRect();
    const absoluteTop = window.pageYOffset + rect.top;

    window.scrollTo({
      top: absoluteTop,
      behavior: 'smooth'
    });

    setTimeout(() => {
      openAlbumModal(imageSrc);
    }, 400);
  }

  // 이벤트 위임 방식
  document.addEventListener('click', function (e) {
    const target = e.target;

    // 앨범 이미지 클릭
    if (target.classList.contains('album-item')) {
      scrollToCoupleAndOpen(target.src);
      return;
    }

    // 닫기 버튼 클릭
    if (target.id === 'albumClose') {
      closeAlbumModal();
      return;
    }

    // 배경 클릭 시 닫기
    if (target.id === 'albumModal') {
      closeAlbumModal();
    }
  });
});