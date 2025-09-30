// بيانات الفعاليات (سوريا)
const events = [
    {
        id: 1,
        title: "مهرجان الموسيقى في دمشق",
        category: "موسيقى",
        date: "2025-10-15",
        location: "دمشق، دار الأوبرا",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=70",
        description: "أمسيات موسيقية مع فرق محلية وعربية في أجواء مميزة.",
        featured: true
    },
    {
        id: 2,
        title: "ماراثون حلب الخيري",
        category: "رياضة",
        date: "2025-11-02",
        location: "حلب، ساحة سعد الله الجابري",
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=1200&q=70",
        description: "ماراثون لمسافات مختلفة لدعم المبادرات المجتمعية.",
        featured: true
    },
    {
        id: 3,
        title: "معرض الفنون في اللاذقية",
        category: "ثقافة",
        date: "2025-10-20",
        location: "اللاذقية، المركز الثقافي",
        image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=70",
        description: "معرض يضم لوحات وأعمال نحت لفنانين سوريين.",
        featured: false
    },
    {
        id: 4,
        title: "مهرجان الطعام السوري",
        category: "عائلي",
        date: "2025-10-25",
        location: "حمص، ساحة الساعة",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=70",
        description: "تجربة مميزة لأشهى الأطباق السورية التقليدية.",
        featured: false
    },
    {
        id: 5,
        title: "مهرجان المسرح في طرطوس",
        category: "ثقافة",
        date: "2025-11-10",
        location: "طرطوس، مسرح الشهيد",
        image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=70",
        description: "عروض مسرحية لفرق شبابية من مختلف المحافظات.",
        featured: false
    }
];

// تهيئة الموقع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحميل الفعاليات البارزة في السلايدر
    loadFeaturedEvents();
    
    // تحميل أحدث الفعاليات
    loadLatestEvents();
    
    // إعداد فلتر الفعاليات إذا كانت في صفحة الفعاليات
    if (document.getElementById('eventsFilter')) {
        setupEventsFilter();
        loadAllEvents();
    }
    
    // إعداد نموذج الاتصال
    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
    
    // تحميل تفاصيل الفعالية إذا كانت في صفحة تفاصيل الفعالية
    if (document.getElementById('eventDetails')) {
        loadEventDetails();
    }
});

// Toast helper
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toastEl = document.createElement('div');
    const bg = type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : type === 'warning' ? 'bg-warning text-dark' : 'bg-secondary';
    toastEl.className = `toast align-items-center text-white ${bg} border-0`;
    toastEl.role = 'alert';
    toastEl.ariaLive = 'assertive';
    toastEl.ariaAtomic = 'true';
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    container.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

// تحميل الفعاليات البارزة في السلايدر
function loadFeaturedEvents() {
    const featuredContainer = document.querySelector('#eventsCarousel .carousel-inner .carousel-item .row');
    
    if (!featuredContainer) return;
    
    const featuredEvents = events.filter(event => event.featured);
    
    featuredEvents.forEach((event, index) => {
        const eventCard = createEventCard(event, true);
        featuredContainer.innerHTML += eventCard;
    });
}

// تحميل أحدث الفعاليات
function loadLatestEvents() {
    const latestContainer = document.getElementById('latestEventsGrid');
    
    if (!latestContainer) return;
    
    // ترتيب الفعاليات حسب التاريخ (الأحدث أولاً)
    const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedEvents.forEach(event => {
        const eventCard = createEventCard(event, false);
        latestContainer.innerHTML += eventCard;
    });
}

// إنشاء كارت فعالية
function createEventCard(event, isCarousel = false) {
    const colClass = isCarousel ? 'col-md-4' : 'col-lg-4 col-md-6';
    
    return `
        <div class="${colClass}">
            <div class="card event-card h-100">
                <span class="badge bg-primary event-badge">${event.category}</span>
                <img src="${event.image}" class="card-img-top" alt="${event.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text flex-grow-1">${event.description}</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between mb-2">
                            <small class="text-muted"><i class="far fa-calendar-alt me-1"></i> ${formatDate(event.date)}</small>
                            <small class="text-muted"><i class="fas fa-map-marker-alt me-1"></i> ${event.location}</small>
                        </div>
                        <a href="event.html?id=${event.id}" class="btn btn-primary w-100">التفاصيل</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// تنسيق التاريخ
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
}

// إعداد فلتر الفعاليات
function setupEventsFilter() {
    const filterForm = document.getElementById('eventsFilter');
    const categorySelect = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    // إضافة تصنيفات إلى القائمة المنسدلة
    const categories = [...new Set(events.map(event => event.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
    
    // تطبيق الفلترة
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        applyFilters();
    });
    
    // إعادة تعيين الفلتر
    document.getElementById('resetFilter').addEventListener('click', function() {
        filterForm.reset();
        applyFilters();
    });
}

// تطبيق الفلتر على الفعاليات
function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const date = document.getElementById('dateFilter').value;
    const location = document.getElementById('locationFilter').value.toLowerCase();
    
    let filteredEvents = [...events];
    
    // فلترة حسب التصنيف
    if (category) {
        filteredEvents = filteredEvents.filter(event => event.category === category);
    }
    
    // فلترة حسب التاريخ
    if (date) {
        filteredEvents = filteredEvents.filter(event => event.date === date);
    }
    
    // فلترة حسب الموقع
    if (location) {
        filteredEvents = filteredEvents.filter(event => 
            event.location.toLowerCase().includes(location)
        );
    }
    
    // عرض الفعاليات المفلترة
    displayFilteredEvents(filteredEvents);
}

// عرض الفعاليات المفلترة
function displayFilteredEvents(filteredEvents) {
    const eventsContainer = document.getElementById('eventsContainer');
    
    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <h4>لا توجد فعاليات تطابق معايير البحث</h4>
                <p>حاول تغيير معايير البحث أو إعادة تعيين الفلتر</p>
            </div>
        `;
        return;
    }
    
    eventsContainer.innerHTML = '';
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event, false);
        eventsContainer.innerHTML += eventCard;
    });
}

// تحميل جميع الفعاليات
function loadAllEvents() {
    displayFilteredEvents(events);
}

// إعداد نموذج الاتصال
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // التحقق من صحة البيانات
        if (!name || !email || !message) {
            showAlert('يرجى ملء جميع الحقول المطلوبة', 'danger');
            showToast('يرجى ملء جميع الحقول المطلوبة', 'danger');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('يرجى إدخال بريد إلكتروني صحيح', 'danger');
            showToast('يرجى إدخال بريد إلكتروني صحيح', 'danger');
            return;
        }
        
        // محاكاة إرسال النموذج
        setTimeout(() => {
            showAlert('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً', 'success');
            showToast('تم إرسال رسالتك بنجاح', 'success');
            contactForm.reset();
        }, 1000);
    });
}

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// عرض رسالة تنبيه
function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    // إخفاء التنبيه تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// تحميل تفاصيل الفعالية
function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));
    
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        document.getElementById('eventDetails').innerHTML = `
            <div class="alert alert-danger text-center">
                <h4>الفعالية غير موجودة</h4>
                <p>قد تكون الفعالية التي تبحث عنها غير متوفرة أو تمت إزالتها.</p>
                <a href="events.html" class="btn btn-primary">العودة إلى قائمة الفعاليات</a>
            </div>
        `;
        return;
    }
    
    // عرض تفاصيل الفعالية
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDate').textContent = formatDate(event.date);
    document.getElementById('eventLocation').textContent = event.location;
    document.getElementById('eventCategory').textContent = event.category;
    document.getElementById('eventDescription').textContent = event.description;
    document.getElementById('eventImage').src = event.image;
    document.getElementById('eventImage').alt = event.title;
    
    // خريطة جوجل - ضبط الموقع ديناميكياً باستخدام العنوان
    const mapIframe = document.getElementById('eventMap');
    if (mapIframe) {
        const q = encodeURIComponent(event.location);
        mapIframe.src = `https://www.google.com/maps?q=${q}&output=embed`;
    }
    
    // إعداد زر إضافة إلى التقويم
    document.getElementById('addToCalendar').addEventListener('click', function() {
        // محاكاة إضافة إلى التقويم
        showAlert('تمت إضافة الفعالية إلى تقويمك', 'success');
    });
    
    // إعداد زر المشاركة
    document.getElementById('shareEvent').addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: event.description,
                url: window.location.href
            })
            .then(() => console.log('تمت المشاركة بنجاح'))
            .catch(error => console.log('حدث خطأ أثناء المشاركة', error));
        } else {
            // نسخ الرابط إلى الحافظة
            navigator.clipboard.writeText(window.location.href)
                .then(() => showAlert('تم نسخ رابط الفعالية إلى الحافظة', 'success'))
                .catch(err => showAlert('تعذر نسخ الرابط، يرجى المحاولة مرة أخرى', 'danger'));
        }
    });
    
    // تحميل الفعاليات ذات الصلة
    loadRelatedEvents(event);
}

// تحميل الفعاليات ذات الصلة
function loadRelatedEvents(currentEvent) {
    const relatedContainer = document.getElementById('relatedEvents');
    
    if (!relatedContainer) return;
    
    const relatedEvents = events.filter(event => 
        event.id !== currentEvent.id && 
        event.category === currentEvent.category
    ).slice(0, 3);
    
    if (relatedEvents.length === 0) {
        relatedContainer.innerHTML = '<p class="text-muted text-center">لا توجد فعاليات ذات صلة</p>';
        return;
    }
    
    relatedEvents.forEach(event => {
        const eventCard = createEventCard(event, false);
        relatedContainer.innerHTML += eventCard;
    });
}