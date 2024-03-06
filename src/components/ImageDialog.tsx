import React, { useCallback, useRef } from 'react';

interface Props {
  src: string;
  alt?: string;
}


export const ImageDialog = ({
  src, alt = ''
}: Props) => {
  const ref =
    useRef<HTMLDialogElement | null>(
      null);

  // ダイアローグを開く処理
  const handleOpenDialog = useCallback(() => {
    if (ref.current) ref.current.showModal();
  }, [ref])

  // ダイアローグを閉じる処理

  const handleCloseDialog = useCallback(() => {
    if (ref.current) ref.current.close();
  }, [ref])

  // ダイアローグ内のクリックイベントハンドラーに渡す処理

  const handleClickInDialog = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, [])
  return (
    <div>
      <div
        role="button"
        onClick={handleOpenDialog}
        onKeyDown={handleOpenDialog}
        className="image-box"
        tabIndex={0}
      >
        <img src={src} alt={alt} width="300" height="200" />
      </div>
      <dialog ref={ref} className="image-dialog" onClick={handleCloseDialog}>
        <div onClick={handleClickInDialog} className="contents">
          <img src={src} alt={alt} width="100%" />
        </div>
      </dialog>
    </div>
  );
}

// todo クリックして拡大表示機能はたぶん実装
// reference https://zenn.dev/ryota0222/articles/d574bae11306b0
