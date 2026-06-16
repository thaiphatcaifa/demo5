import React, { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';

// ── Inline URL dialog (thay thế window.prompt) ─────────────────────────────
function UrlDialog({ title, placeholder, defaultValue, onConfirm, onCancel }) {
  const [val, setVal] = useState(defaultValue || '');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); inputRef.current?.select(); }, []);

  const submit = () => { if (val.trim()) onConfirm(val.trim()); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <p className="text-sm font-bold text-gray-700 mb-3">{title}</p>
        <input
          ref={inputRef}
          type="url"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') onCancel(); }}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/30 focus:border-forest-green"
        />
        <div className="flex gap-2 mt-4">
          <button onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            Hủy
          </button>
          <button onClick={submit} disabled={!val.trim()}
            className="flex-1 px-4 py-2 bg-forest-green text-white rounded-xl text-sm font-bold hover:bg-[#1E5225] disabled:opacity-50 transition-colors">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Toolbar button helper ────────────────────────────────────────────────────
function Btn({ onClick, active, disabled, title, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`px-2.5 py-1.5 rounded text-sm transition-colors disabled:opacity-30 ${
        active ? 'bg-forest-green text-white' : 'text-gray-700 hover:bg-gray-200'
      } ${className}`}>
      {children}
    </button>
  );
}

function Sep() { return <div className="w-px h-5 bg-gray-300 mx-0.5 self-center shrink-0" />; }

// ── Toolbar ──────────────────────────────────────────────────────────────────
function MenuBar({ editor, wordCount }) {
  const [dialog, setDialog] = useState(null); // { type: 'image' | 'link', defaultValue? }

  if (!editor) return null;

  const openImageDialog = () => setDialog({ type: 'image' });
  const openLinkDialog  = () => setDialog({ type: 'link', defaultValue: editor.getAttributes('link').href || '' });

  const handleImageConfirm = (url) => {
    editor.chain().focus().setImage({ src: url }).run();
    setDialog(null);
  };

  const handleLinkConfirm = (url) => {
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setDialog(null);
  };

  const handleLinkCancel = () => setDialog(null);

  const handleUnsetLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setDialog(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-1 p-2.5 border-b border-gray-200 bg-gray-50 rounded-t-xl items-center">
        {/* Undo / Redo */}
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Hoàn tác">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Làm lại">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"/></svg>
        </Btn>

        <Sep />

        {/* Format */}
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="In đậm">
          <strong>B</strong>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="In nghiêng">
          <em>I</em>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Gạch chân">
          <span className="underline">U</span>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Gạch ngang">
          <span className="line-through">S</span>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Dạ quang"
          className={editor.isActive('highlight') ? '!bg-yellow-300 !text-black' : ''}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11.489 2.04a1.5 1.5 0 012.06.501l4 7a1.5 1.5 0 01-.548 2.052l-2.248 1.285.766 3.065a.75.75 0 01-.98.905l-3.5-1.166a.75.75 0 01-.47-.574l-.343-2.062-1.97 1.127a1.5 1.5 0 01-2.053-.548l-2-3.5a1.5 1.5 0 01.548-2.052l7.738-4.034z"/></svg>
        </Btn>
        <input type="color"
          onInput={e => editor.chain().focus().setColor(e.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#2B6830'}
          title="Màu chữ"
          className="w-7 h-7 p-0.5 border border-gray-300 rounded cursor-pointer"
        />

        <Sep />

        {/* Align */}
        <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Căn trái">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h12"/></svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Căn giữa">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M6 18h12"/></svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Căn phải">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M12 12h8M8 18h12"/></svg>
        </Btn>

        <Sep />

        {/* Headings & blocks */}
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>H2</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>H3</Btn>
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Danh sách gạch đầu">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Danh sách số">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10M3 8h.01M3 12h.01M3 16h.01"/></svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Trích dẫn">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/></svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Đường kẻ ngang">—</Btn>

        <Sep />

        {/* Link */}
        {editor.isActive('link') ? (
          <div className="flex items-center gap-0.5">
            <Btn active onClick={openLinkDialog} title="Sửa link">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
            </Btn>
            <button type="button" onClick={handleUnsetLink} title="Xóa link"
              className="px-2 py-1.5 rounded text-red-500 hover:bg-red-50 transition-colors text-xs">✕</button>
          </div>
        ) : (
          <Btn onClick={openLinkDialog} title="Chèn link">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
          </Btn>
        )}

        {/* Image */}
        <button type="button" onClick={openImageDialog}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-forest-medium text-white text-sm font-bold hover:bg-[#1E5225] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          Ảnh
        </button>

        {/* Clear format */}
        <button type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          title="Xóa toàn bộ định dạng"
          className="ml-auto px-2.5 py-1.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>

        {/* Word count */}
        <span className="text-xs text-gray-400 px-1 whitespace-nowrap">{wordCount} từ</span>
      </div>

      {/* Image dialog */}
      {dialog?.type === 'image' && (
        <UrlDialog
          title="Chèn ảnh từ URL"
          placeholder="https://images.unsplash.com/..."
          onConfirm={handleImageConfirm}
          onCancel={() => setDialog(null)}
        />
      )}

      {/* Link dialog */}
      {dialog?.type === 'link' && (
        <UrlDialog
          title="Chèn hoặc chỉnh sửa liên kết"
          placeholder="https://example.com"
          defaultValue={dialog.defaultValue}
          onConfirm={handleLinkConfirm}
          onCancel={() => setDialog(null)}
        />
      )}
    </>
  );
}

// ── Main editor ──────────────────────────────────────────────────────────────
export default function TiptapEditor({ content, onChange }) {
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageResize.configure({
        inline: true,
        HTMLAttributes: { class: 'rounded-lg shadow-sm' },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-forest-medium underline cursor-pointer' },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      const text = editor.state.doc.textContent;
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-indigo max-w-none focus:outline-none min-h-[400px] px-8 py-6 [&_img]:!inline-block [&_img]:!m-0',
      },
    },
  });

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <MenuBar editor={editor} wordCount={wordCount} />
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
