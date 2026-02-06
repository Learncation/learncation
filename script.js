(function(){
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = String(new Date().getFullYear()); }

  function scrollToId(id){
    const el = document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth', block:'start'});
  }

  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-scroll');
      if(id) scrollToId(id);
    });
  });

  const form = document.getElementById('bookingForm');
  const help = document.getElementById('formHelp');

  function setHelp(msg, isError){
    if(!help) return;
    help.textContent = msg || '';
    help.style.color = isError ? 'rgba(251,113,133,0.95)' : 'rgba(255,255,255,0.70)';
  }

  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      setHelp('');

      const data = new FormData(form);
      const fullName = String(data.get('fullName') || '').trim();
      const email = String(data.get('email') || '').trim();
      const groupSize = String(data.get('groupSize') || '').trim();
      const date = String(data.get('date') || '').trim();
      const bookingType = String(data.get('bookingType') || '').trim();
      const message = String(data.get('message') || '').trim();

      if(!fullName || !email){
        setHelp('Please add your name and email.', true);
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if(!emailOk){
        setHelp('Please enter a valid email address.', true);
        return;
      }

      const subject = `Learncation booking request - ${bookingType || 'Booking'} - ${fullName}`;
      const lines = [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Booking type: ${bookingType || '-'}`,
        `Group size: ${groupSize || '-'}`,
        `Preferred date: ${date || '-'}`,
        '',
        'Message:',
        message || '-'
      ];

      const body = lines.join('\n');

      const to = 'hello@learncationkorea.com';
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      try{
        window.location.href = mailto;
        setHelp('Opening your email app. If nothing happens, copy the details and email us at hello@learncationkorea.com.', false);
      }catch(err){
        setHelp('Could not open your email app. Please email us at hello@learncationkorea.com.', true);
      }
    });
  }
})();
