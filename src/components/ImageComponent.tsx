import { clickOptions } from '@testing-library/user-event/dist/click';
import React, { useCallback, useRef, useState } from 'react';

export const ImageComponent = () => {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    // FileListのままだとforEachが使えないので配列に変換する
    const fileArray = Array.from(files);

    // 読み込み結果を補完するための一時配列
    const loadImages = new Array(fileArray.length);
    let loadCount = 0;

    fileArray.forEach((file, index) => {
      // ファイルを読み込むためにFileReaderを利用する
      const reader = new FileReader();
      // ファイルの読み込みが完了したら、画像の配列に加える
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result !== 'string') {
          return;
        }
        // 読み込みの結果を一時配列に入れる
        loadImages[index] = result;
        loadCount++;

        // 全てのファイルが読み込まれたかチェック
        if (loadCount === fileArray.length) {
          setBase64Images((prevImages) => [...prevImages, ...loadImages]);
        }
      };
      // 画像ファイルをbase64形式で読み込む
      reader.readAsDataURL(file);
    });
    // inputの値をリセットする
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleImageClick = (index: number) => {
    setBase64Images((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);

    // ドラッグ＆ドロップされたファイルを取得
    const files = e.dataTransfer.files;
    if (files.length === 0) {
      return;
    }
    // 今回は画像は一枚だけと仮定。複数の場合はhandleInputFileと同じように実装する。
    const file = files[0];
    // png,jpeg以外のファイルなら何もしない
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const data = reader.result;
      if (typeof data !== 'string') {
        return;
      }
      setBase64Images((prevImages) => [...prevImages, data]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="importContainer">
      <input
        type="file"
        multiple // 画像を複数選択できるようにする
        accept="image/jpeg, image/png"
        onChange={handleInputFile}
        ref={inputRef}
      />
      <div className="dragContainer">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`drag ${
            dragOver
              ? { backgroundColor: 'white' }
              : { backgroundColor: '#cbd5e1' }
          }`}>
          ドラッグ&ドロップ
        </div>
      </div>
      <div className="previewContainer">
        <p>画像プレビュー</p>
        <div className="preview">
          {base64Images.length !== 0 &&
            base64Images.map((image, idx) => (
              <div>
                <div key={idx} className="imageContainer">
                  <img
                    src={image}
                    className="image"
                    onClick={() => handleImageClick}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
