// Global variables
const { jsPDF } = window.jspdf;
let imageFiles = [];
let imagePreviews = [];
let pdfDoc = null;
let isDarkMode = false;

// DOM elements
const elements = {
    dragArea: document.getElementById('dragArea'),
    fileInput: document.getElementById('image-upload'),
    uploadBtn: document.getElementById('uploadBtn'),
    imagesPreview: document.getElementById('images-preview'),
    progressContainer: document.getElementById('progressContainer'),
    progressBar: document.getElementById('progressBar'),
    spinner: document.getElementById('spinner'),
    toast: document.getElementById('toast'),
    darkModeToggle: document.getElementById('darkModeToggle'),
    pdfPreviewModal: document.getElementById('pdfPreviewModal'),
    closeModal: document.getElementById('closeModal'),
    pdfPreviewFrame: document.getElementById('pdfPreviewFrame')
};

// Configuration options
const config = {
    pdfName: document.getElementById('pdf-name'),
    pageSize: document.getElementById('page-size'),
    customSizeGroup: document.getElementById('custom-size-group'),
    customWidth: document.getElementById('custom-width'),
    customHeight: document.getElementById('custom-height'),
    pageOrientation: document.getElementById('page-orientation'),
    pageMargin: document.getElementById('page-margin'),
    marginValue: document.getElementById('margin-value'),
    bgColor: document.getElementById('bg-color'),
    imageQuality: document.getElementById('image-quality'),
    qualityValue: document.getElementById('quality-value'),
    pdfResolution: document.getElementById('pdf-resolution'),
    pdfPassword: document.getElementById('pdf-password'),
    encryptionLevel: document.getElementById('encryption-level'),
    allowPrinting: document.getElementById('allow-printing'),
    allowCopying: document.getElementById('allow-copying'),
    allowModifying: document.getElementById('allow-modifying'),
    allowAnnotations: document.getElementById('allow-annotations'),
    addToc: document.getElementById('add-toc'),
    pageNumbers: document.getElementById('page-numbers'),
    pageNumbersOptions: document.getElementById('page-numbers-options'),
    pageNumbersPosition: document.getElementById('page-numbers-position'),
    pageNumbersFormat: document.getElementById('page-numbers-format'),
    addBookmarks: document.getElementById('add-bookmarks'),
    enableWatermark: document.getElementById('enable-watermark'),
    watermarkOptions: document.getElementById('watermark-options'),
    watermarkText: document.getElementById('watermark-text'),
    watermarkOpacity: document.getElementById('watermark-opacity'),
    watermarkOpacityValue: document.getElementById('watermark-opacity-value'),
    watermarkColor: document.getElementById('watermark-color'),
    watermarkSize: document.getElementById('watermark-size'),
    watermarkPreviewText: document.getElementById('watermark-preview-text'),
    enableOcr: document.getElementById('enable-ocr'),
    ocrOptions: document.getElementById('ocr-options'),
    ocrLanguage: document.getElementById('ocr-language'),
    ocrEngine: document.getElementById('ocr-engine'),
    smartCrop: document.getElementById('smart-crop'),
    cropOptions: document.getElementById('crop-options'),
    cropMode: document.getElementById('crop-mode'),
    removeBg: document.getElementById('remove-bg'),
    autoEnhance: document.getElementById('auto-enhance'),
    enhanceOptions: document.getElementById('enhance-options'),
    enhanceLevel: document.getElementById('enhance-level'),
    fixPerspective: document.getElementById('fix-perspective'),
    aiTagging: document.getElementById('ai-tagging'),
    taggingOptions: document.getElementById('tagging-options'),
    taggingMode: document.getElementById('tagging-mode'),
    generateKeywords: document.getElementById('generate-keywords'),
    handwritingRecognition: document.getElementById('handwriting-recognition'),
    objectDetection: document.getElementById('object-detection'),
    autoTranslation: document.getElementById('auto-translation'),
    generateShareLink: document.getElementById('generate-share-link'),
    shareOptions: document.getElementById('share-options'),
    linkExpiration: document.getElementById('link-expiration'),
    sharePermissions: document.getElementById('share-permissions'),
    enableCollaboration: document.getElementById('enable-collaboration'),
    collaborationOptions: document.getElementById('collaboration-options'),
    teamEmails: document.getElementById('team-emails'),
    enableBatch: document.getElementById('enable-batch'),
    batchOptions: document.getElementById('batch-options'),
    batchOutput: document.getElementById('batch-output'),
    enableVersioning: document.getElementById('enable-versioning'),
    versioningOptions: document.getElementById('versioning-options'),
    versionRetention: document.getElementById('version-retention'),
    googleDriveBtn: document.getElementById('googleDriveBtn'),
    dropboxBtn: document.getElementById('dropboxBtn'),
    oneDriveBtn: document.getElementById('oneDriveBtn')
};

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize the application
function init() {
    setupEventListeners();
    setupTabs();
    setupParticles();
    updateDynamicValues();
    checkDarkModePreference();
}

// Set up all event listeners
function setupEventListeners() {
    // File input change
    elements.fileInput.addEventListener('change', handleFileSelect);
    
    // Upload button click
    elements.uploadBtn.addEventListener('click', () => elements.fileInput.click());
    
    // Drag and drop events
    elements.dragArea.addEventListener('dragover', handleDragOver);
    elements.dragArea.addEventListener('dragleave', handleDragLeave);
    elements.dragArea.addEventListener('drop', handleDrop);
    
    // Dark mode toggle
    elements.darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Modal close button
    elements.closeModal.addEventListener('click', closeModal);
    
    // Dynamic value updates
    config.pageMargin.addEventListener('input', updateDynamicValues);
    config.imageQuality.addEventListener('input', updateDynamicValues);
    config.watermarkOpacity.addEventListener('input', updateDynamicValues);
    config.watermarkText.addEventListener('input', updateWatermarkPreview);
    config.watermarkColor.addEventListener('input', updateWatermarkPreview);
    config.watermarkSize.addEventListener('change', updateWatermarkPreview);
    
    // Checkbox toggles
    config.pageNumbers.addEventListener('change', togglePageNumbersOptions);
    config.enableWatermark.addEventListener('change', toggleWatermarkOptions);
    config.enableOcr.addEventListener('change', toggleOcrOptions);
    config.smartCrop.addEventListener('change', toggleCropOptions);
    config.autoEnhance.addEventListener('change', toggleEnhanceOptions);
    config.aiTagging.addEventListener('change', toggleTaggingOptions);
    config.generateShareLink.addEventListener('change', toggleShareOptions);
    config.enableCollaboration.addEventListener('change', toggleCollaborationOptions);
    config.enableBatch.addEventListener('change', toggleBatchOptions);
    config.enableVersioning.addEventListener('change', toggleVersioningOptions);
    config.pageSize.addEventListener('change', toggleCustomSize);
    
    // Cloud buttons
    config.googleDriveBtn.addEventListener('click', () => showToast('Google Drive integration coming soon!', 'info'));
    config.dropboxBtn.addEventListener('click', () => showToast('Dropbox integration coming soon!', 'info'));
    config.oneDriveBtn.addEventListener('click', () => showToast('OneDrive integration coming soon!', 'info'));
}

// Set up tab functionality
function setupTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Handle file selection
function handleFileSelect(e) {
    const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
    if (!files || files.length === 0) return;
    processFiles(Array.from(files));
}

// Process selected files
function processFiles(files) {
    const validFiles = files.filter(file => 
        file.type.match('image.*') || 
        file.name.toLowerCase().endsWith('.pdf') ||
        file.name.toLowerCase().endsWith('.doc') ||
        file.name.toLowerCase().endsWith('.docx') ||
        file.name.toLowerCase().endsWith('.xls') ||
        file.name.toLowerCase().endsWith('.xlsx') ||
        file.name.toLowerCase().endsWith('.ppt') ||
        file.name.toLowerCase().endsWith('.pptx') ||
        file.name.toLowerCase().endsWith('.txt')
    );
    
    if (validFiles.length === 0) {
        showToast('Please select valid files (images, PDFs, or documents)', 'error');
        return;
    }
    
    if (validFiles.length !== files.length) {
        showToast(`Some files were not supported (${files.length - validFiles.length} skipped)`, 'warning');
    }
    
    imageFiles = [...imageFiles, ...validFiles];
    updateImagePreviews();
    elements.dragArea.classList.add('active');
    setTimeout(() => elements.dragArea.classList.remove('active'), 2000);
}

// Update image previews
function updateImagePreviews() {
    elements.imagesPreview.innerHTML = "";
    imagePreviews = [];
    
    imageFiles.forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const previewCard = createPreviewCard(e.target.result, file.name, index);
            elements.imagesPreview.appendChild(previewCard);
            imagePreviews.push(previewCard);
        };
        
        if (file.type.match('image.*')) {
            reader.readAsDataURL(file);
        } else {
            // For non-image files, use a generic icon
            const icon = getFileIcon(file.name);
            previewCard = createPreviewCard(icon, file.name, index);
            elements.imagesPreview.appendChild(previewCard);
            imagePreviews.push(previewCard);
        }
    });
}

// Get appropriate icon for file type
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        pdf: 'fa-file-pdf',
        doc: 'fa-file-word',
        docx: 'fa-file-word',
        xls: 'fa-file-excel',
        xlsx: 'fa-file-excel',
        ppt: 'fa-file-powerpoint',
        pptx: 'fa-file-powerpoint',
        txt: 'fa-file-alt'
    };
    
    const iconClass = icons[ext] || 'fa-file';
    return `<i class="fas ${iconClass}" style="font-size: 3rem; color: #6c5ce7;"></i>`;
}

// Create preview card for a file
function createPreviewCard(content, filename, index) {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.setAttribute('data-index', index);
    
    const previewContent = document.createElement('div');
    previewContent.className = 'preview-content';
    
    if (typeof content === 'string' && content.startsWith('data:image')) {
        // Image preview
        const img = document.createElement('img');
        img.src = content;
        img.alt = `Preview ${index + 1}`;
        previewContent.appendChild(img);
    } else {
        // Document icon preview
        previewContent.innerHTML = content;
        previewContent.style.display = 'flex';
        previewContent.style.alignItems = 'center';
        previewContent.style.justifyContent = 'center';
        previewContent.style.height = '180px';
        previewContent.style.backgroundColor = isDarkMode ? '#2a2a2a' : '#f9f9f9';
    }
    
    const info = document.createElement('div');
    info.className = 'image-info';
    
    const name = document.createElement('h4');
    name.textContent = truncateFilename(filename, 20);
    name.title = filename;
    
    const size = document.createElement('p');
    size.textContent = formatFileSize(imageFiles[index].size);
    
    info.appendChild(name);
    info.appendChild(size);
    
    const actions = document.createElement('div');
    actions.className = 'image-actions';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.title = 'Remove file';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeImage(index);
    });
    
    actions.appendChild(deleteBtn);
    
    card.appendChild(previewContent);
    card.appendChild(info);
    card.appendChild(actions);
    
    // Make card draggable for reordering
    card.draggable = true;
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragover', handleDragOverCard);
    card.addEventListener('dragleave', handleDragLeaveCard);
    card.addEventListener('drop', handleDropCard);
    card.addEventListener('dragend', handleDragEnd);
    
    return card;
}

// Handle drag start for reordering
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-index'));
    e.target.classList.add('dragging');
    setTimeout(() => e.target.style.opacity = '0.4', 0);
}

// Handle drag over card for reordering
function handleDragOverCard(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

// Handle drag leave card for reordering
function handleDragLeaveCard(e) {
    e.currentTarget.classList.remove('drag-over');
}

// Handle drop card for reordering
function handleDropCard(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const fromIndex = e.dataTransfer.getData('text/plain');
    const toIndex = e.currentTarget.getAttribute('data-index');
    
    if (fromIndex !== toIndex) {
        reorderImages(fromIndex, toIndex);
    }
}

// Handle drag end for reordering
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    e.target.style.opacity = '1';
}

// Reorder images
function reorderImages(fromIndex, toIndex) {
    const movedItem = imageFiles.splice(fromIndex, 1)[0];
    imageFiles.splice(toIndex, 0, movedItem);
    updateImagePreviews();
}

// Remove an image
function removeImage(index) {
    imageFiles.splice(index, 1);
    updateImagePreviews();
    showToast('File removed', 'info');
}

// Clear all images
function clearAll() {
    if (imageFiles.length === 0) {
        showToast('No files to clear', 'info');
        return;
    }
    
    imageFiles = [];
    elements.imagesPreview.innerHTML = '';
    elements.fileInput.value = '';
    showToast('All files cleared', 'info');
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    elements.dragArea.classList.add('active');
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    elements.dragArea.classList.remove('active');
}

// Handle drop
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    elements.dragArea.classList.remove('active');
    handleFileSelect(e);
}

// Generate PDF
async function generatePDF() {
    if (imageFiles.length === 0) {
        showToast('Please add at least one file', 'error');
        return;
    }
    
    showProgress(true);
    
    try {
        pdfDoc = await createPDF();
        
        // Generate PDF blob
        const pdfBlob = pdfDoc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Set the filename
        const pdfName = config.pdfName.value || 'MyDocument';
        
        // Create download link
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = `${pdfName}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        showToast('PDF generated successfully!', 'success');
    } catch (error) {
        console.error('Error generating PDF:', error);
        showToast('Error generating PDF. Please try again.', 'error');
    } finally {
        showProgress(false);
    }
}

// Create PDF document
async function createPDF() {
    // Determine page size
    let pageSize = config.pageSize.value;
    if (pageSize === 'custom') {
        const width = parseFloat(config.customWidth.value) || 210;
        const height = parseFloat(config.customHeight.value) || 297;
        pageSize = [width, height];
    }
    
    // Create new PDF
    const pdf = new jsPDF({
        orientation: config.pageOrientation.value,
        unit: 'mm',
        format: pageSize
    });
    
    // Set document properties
    pdf.setProperties({
        title: config.pdfName.value || 'MyDocument',
        subject: 'Generated with PDF Master 9000 Ultra',
        author: 'PDF Master 9000 User',
        keywords: 'pdf, conversion, images',
        creator: 'PDF Master 9000 Ultra'
    });
    
    // Set security if password is provided
    if (config.pdfPassword.value) {
        const permissions = {
            print: config.allowPrinting.checked,
            modify: config.allowModifying.checked,
            copy: config.allowCopying.checked,
            annotate: config.allowAnnotations.checked
        };
        
        pdf.setEncryption({
            userPassword: config.pdfPassword.value,
            ownerPassword: config.pdfPassword.value + '_owner',
            permissions: permissions,
            encryptionLevel: config.encryptionLevel.value
        });
    }
    
    const bgColor = config.bgColor.value;
    const margin = parseInt(config.marginValue.textContent);
    const quality = parseFloat(config.qualityValue.textContent) / 100;
    
    for (let i = 0; i < imageFiles.length; i++) {
        updateProgressBar((i / imageFiles.length) * 100);
        
        // Skip non-image files for now (could add support later)
        if (!imageFiles[i].type.match('image.*')) {
            showToast(`Skipped non-image file: ${imageFiles[i].name}`, 'warning');
            continue;
        }
        
        const imgData = await loadImage(imageFiles[i]);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Set background
        pdf.setFillColor(bgColor);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        
        // Calculate image dimensions and position based on fit option
        const imgProps = calculateImageDimensions(imgData, pageWidth, pageHeight, margin);
        
        // Add image to PDF
        pdf.addImage(
            imgData.src,
            imgData.type,
            imgProps.x,
            imgProps.y,
            imgProps.width,
            imgProps.height,
            undefined,
            'FAST'
        );
        
        // Add watermark if enabled
        if (config.enableWatermark.checked && config.watermarkText.value) {
            addWatermark(pdf, pageWidth, pageHeight);
        }
        
        // Add page numbers if enabled
        if (config.pageNumbers.checked) {
            addPageNumber(pdf, i + 1, imageFiles.length, pageWidth, pageHeight);
        }
        
        // Add page if not last image
        if (i < imageFiles.length - 1) {
            pdf.addPage(pageSize, config.pageOrientation.value);
        }
    }
    
    // Add table of contents if enabled
    if (config.addToc.checked) {
        addTableOfContents(pdf);
    }
    
    updateProgressBar(100);
    return pdf;
}

// Calculate image dimensions and position
function calculateImageDimensions(imgData, pageWidth, pageHeight, margin) {
    const imgRatio = imgData.width / imgData.height;
    const pageRatio = (pageWidth - margin * 2) / (pageHeight - margin * 2);
    
    let width, height, x, y;
    
    // For now, we'll just use 'contain' logic
    if (imgRatio > pageRatio) {
        width = pageWidth - margin * 2;
        height = width / imgRatio;
    } else {
        height = pageHeight - margin * 2;
        width = height * imgRatio;
    }
    
    // Center the image
    x = (pageWidth - width) / 2;
    y = (pageHeight - height) / 2;
    
    return { x, y, width, height };
}

// Load image and return dimensions
function loadImage(file) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve({
                src: img,
                width: img.width,
                height: img.height,
                type: file.type.split('/')[1] || 'jpeg'
            });
        };
        img.src = URL.createObjectURL(file);
    });
}

// Add watermark to PDF
function addWatermark(pdf, pageWidth, pageHeight) {
    const text = config.watermarkText.value;
    const opacity = parseFloat(config.watermarkOpacity.value);
    const color = config.watermarkColor.value;
    const size = config.watermarkSize.value;
    
    let fontSize;
    switch (size) {
        case 'small': fontSize = 24; break;
        case 'medium': fontSize = 48; break;
        case 'large': fontSize = 72; break;
        case 'xlarge': fontSize = 96; break;
        default: fontSize = 48;
    }
    
    pdf.setTextColor(color);
    pdf.setFontSize(fontSize);
    
    // Calculate text width and height
    const textWidth = pdf.getStringUnitWidth(text) * fontSize / pdf.internal.scaleFactor;
    const textHeight = fontSize / pdf.internal.scaleFactor;
    
    // Center the watermark
    const x = (pageWidth - textWidth) / 2;
    const y = (pageHeight - textHeight) / 2;
    
    // Save context, apply opacity, draw text, restore context
    pdf.saveGraphicsState();
    pdf.setGState(new pdf.GState({opacity: opacity}));
    pdf.text(text, x, y, {angle: 45});
    pdf.restoreGraphicsState();
}

// Add page number to PDF
function addPageNumber(pdf, currentPage, totalPages, pageWidth, pageHeight) {
    const format = config.pageNumbersFormat.value || 'Page {n} of {total}';
    const text = format.replace('{n}', currentPage).replace('{total}', totalPages);
    
    pdf.setFontSize(10);
    pdf.setTextColor('#666666');
    
    let x, y;
    const margin = 10;
    
    switch (config.pageNumbersPosition.value) {
        case 'bottom-right':
            x = pageWidth - margin;
            y = pageHeight - margin;
            pdf.text(text, x, y, {align: 'right'});
            break;
        case 'bottom-center':
            x = pageWidth / 2;
            y = pageHeight - margin;
            pdf.text(text, x, y, {align: 'center'});
            break;
        case 'top-right':
            x = pageWidth - margin;
            y = margin;
            pdf.text(text, x, y, {align: 'right'});
            break;
        case 'top-center':
            x = pageWidth / 2;
            y = margin;
            pdf.text(text, x, y, {align: 'center'});
            break;
    }
}

// Add table of contents to PDF
function addTableOfContents(pdf) {
    // This is a simplified version - would need more complex logic for a real TOC
    pdf.insertPage(1);
    pdf.setPage(1);
    
    pdf.setFontSize(20);
    pdf.setTextColor('#6c5ce7');
    pdf.text('Table of Contents', 20, 20);
    
    pdf.setFontSize(12);
    pdf.setTextColor('#000000');
    
    let y = 40;
    for (let i = 0; i < imageFiles.length; i++) {
        pdf.text(`Page ${i + 2}: ${truncateFilename(imageFiles[i].name, 50)}`, 20, y);
        y += 10;
        
        if (y > pdf.internal.pageSize.getHeight() - 20) {
            pdf.addPage();
            y = 20;
        }
    }
}

// Preview PDF
async function previewPDF() {
    if (imageFiles.length === 0) {
        showToast('Please add at least one file', 'error');
        return;
    }
    
    showProgress(true);
    
    try {
        pdfDoc = await createPDF();
        const pdfBlob = pdfDoc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        elements.pdfPreviewFrame.src = pdfUrl;
        elements.pdfPreviewModal.classList.add('show');
    } catch (error) {
        console.error('Error previewing PDF:', error);
        showToast('Error previewing PDF. Please try again.', 'error');
    } finally {
        showProgress(false);
    }
}

// Close modal
function closeModal() {
    elements.pdfPreviewModal.classList.remove('show');
    if (elements.pdfPreviewFrame.src) {
        URL.revokeObjectURL(elements.pdfPreviewFrame.src);
        elements.pdfPreviewFrame.src = '';
    }
}

// Save to cloud
function saveToCloud() {
    showToast('Cloud save functionality coming soon!', 'info');
}

// Show/hide progress
function showProgress(show) {
    if (show) {
        elements.progressContainer.style.display = 'block';
        elements.spinner.style.display = 'block';
    } else {
        elements.progressContainer.style.display = 'none';
        elements.spinner.style.display = 'none';
    }
}

// Update progress bar
function updateProgressBar(percent) {
    elements.progressBar.style.width = `${percent}%`;
    elements.progressBar.textContent = `${Math.round(percent)}%`;
}

// Update dynamic values
function updateDynamicValues() {
    config.marginValue.textContent = `${config.pageMargin.value} mm`;
    config.qualityValue.textContent = `${Math.round(config.imageQuality.value * 100)}%`;
    config.watermarkOpacityValue.textContent = `${Math.round(config.watermarkOpacity.value * 100)}%`;
}

// Update watermark preview
function updateWatermarkPreview() {
    config.watermarkPreviewText.textContent = config.watermarkText.value;
    config.watermarkPreviewText.style.color = config.watermarkColor.value;
    config.watermarkPreviewText.style.opacity = config.watermarkOpacity.value;
    
    let fontSize;
    switch (config.watermarkSize.value) {
        case 'small': fontSize = '16px'; break;
        case 'medium': fontSize = '24px'; break;
        case 'large': fontSize = '36px'; break;
        case 'xlarge': fontSize = '48px'; break;
        default: fontSize = '24px';
    }
    
    config.watermarkPreviewText.style.fontSize = fontSize;
}

// Toggle page numbers options
function togglePageNumbersOptions() {
    config.pageNumbersOptions.style.display = config.pageNumbers.checked ? 'block' : 'none';
}

// Toggle watermark options
function toggleWatermarkOptions() {
    config.watermarkOptions.style.display = config.enableWatermark.checked ? 'block' : 'none';
    if (config.enableWatermark.checked) updateWatermarkPreview();
}

// Toggle OCR options
function toggleOcrOptions() {
    config.ocrOptions.style.display = config.enableOcr.checked ? 'block' : 'none';
}

// Toggle crop options
function toggleCropOptions() {
    config.cropOptions.style.display = config.smartCrop.checked ? 'block' : 'none';
}

// Toggle enhance options
function toggleEnhanceOptions() {
    config.enhanceOptions.style.display = config.autoEnhance.checked ? 'block' : 'none';
}

// Toggle tagging options
function toggleTaggingOptions() {
    config.taggingOptions.style.display = config.aiTagging.checked ? 'block' : 'none';
}

// Toggle share options
function toggleShareOptions() {
    config.shareOptions.style.display = config.generateShareLink.checked ? 'block' : 'none';
    config.sharePermissions.style.display = config.generateShareLink.checked ? 'block' : 'none';
}

// Toggle collaboration options
function toggleCollaborationOptions() {
    config.collaborationOptions.style.display = config.enableCollaboration.checked ? 'block' : 'none';
}

// Toggle batch options
function toggleBatchOptions() {
    config.batchOptions.style.display = config.enableBatch.checked ? 'block' : 'none';
}

// Toggle versioning options
function toggleVersioningOptions() {
    config.versioningOptions.style.display = config.enableVersioning.checked ? 'block' : 'none';
}

// Toggle custom size options
function toggleCustomSize() {
    config.customSizeGroup.style.display = config.pageSize.value === 'custom' ? 'block' : 'none';
}

// Toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    elements.darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode);
}

// Check dark mode preference
function checkDarkModePreference() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        toggleDarkMode();
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    elements.toast.className = `toast ${type}`;
    elements.toast.innerHTML = `
        <i class="fas fa-${
            type === 'success' ? 'check-circle' : 
            type === 'error' ? 'exclamation-circle' : 
            type === 'warning' ? 'exclamation-triangle' : 'info-circle'
        }"></i>
        ${message}
    `;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// Truncate filename
function truncateFilename(filename, maxLength) {
    if (filename.length <= maxLength) return filename;
    const extension = filename.split('.').pop();
    const name = filename.substring(0, maxLength - extension.length - 3);
    return `${name}...${extension}`;
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i]);
}

// Create floating particles
function setupParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s linear infinite`;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
}

// Reorder images (batch reorder)
function reorderImages() {
    if (imageFiles.length < 2) {
        showToast('Need at least 2 files to reorder', 'info');
        return;
    }
    
    // This would be replaced with a more sophisticated UI for reordering
    imageFiles.reverse();
    updateImagePreviews();
    showToast('Files reordered', 'success');
}

// Batch edit images
function batchEdit() {
    if (imageFiles.length === 0) {
        showToast('No files to edit', 'info');
        return;
    }
    
    showToast('Batch edit functionality coming soon!', 'info');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        100% {
            transform: translate(0, 0);
        }
    }
`;
document.head.appendChild(style);