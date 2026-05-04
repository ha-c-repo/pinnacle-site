// Pinnacle Strategic Advisory - Strategic Diagnostic
// 5 questions in, routed result out. No backend, no email gate.

(function () {
  'use strict';

  const submit = document.getElementById('diag-submit');
  const restart = document.getElementById('diag-restart');
  const result = document.getElementById('diag-result');
  const headline = document.getElementById('result-headline');
  const body = document.getElementById('result-body');
  const fit = document.getElementById('result-fit');
  if (!submit) return;

  function getRadio(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
  }
  function getText(name) {
    const el = document.querySelector(`textarea[name="${name}"]`);
    return el ? el.value.trim() : '';
  }

  // Result archetypes
  const archetypes = {
    strategy: {
      headline: 'You are running on instinct, not strategy.',
      body: 'When decisions get made one at a time without a 12 to 18 month frame, the business pays a tax in two places. Time spent re-debating decisions you already made. Initiatives that get half-shipped because nothing prioritized them against the others. The Diagnose phase usually surfaces three or four "decisions you have been avoiding" inside the first two weeks.',
      service: { name: 'Strategic Planning', url: 'services.html#strategic-planning', why: 'A 60 to 90 day diagnostic and 12 to 36 month roadmap built from your numbers, not a template. You leave knowing where to focus, what to stop, and how to measure progress.' }
    },
    model: {
      headline: 'The model that built the business is starting to break.',
      body: 'What worked at $1M does not work at $10M. What worked at $10M does not work at $25M. The shape of the model has to change at each step. Doing more of the same harder is the most common failure pattern, and it is the one that costs the most time before the owner finally calls.',
      service: { name: 'Business Model Transformation', url: 'services.html#business-model', why: 'We redesign how the business creates and captures value. New revenue streams. Sharper pricing. Better customer economics. Built and shipped, not just designed.' }
    },
    brand: {
      headline: 'The brand is doing less work than your team is.',
      body: 'When you lose deals to competitors who do less for more, the brand is usually the gap. Not the logo. The story. The positioning. The narrative that explains, in one sentence, why a buyer should pick you instead of the obvious alternatives. Most owner-led businesses outgrow their brand by year five and never rebuild it.',
      service: { name: 'Brand Repositioning', url: 'services.html#brand', why: 'We rebuild the brand from the inside out. Strategic positioning, identity, messaging, and market narrative. Inside out, not just a new website.' }
    },
    unsure: {
      headline: 'Something is off, and naming it is half the work.',
      body: 'Most of the calls we take open with this answer. The owner knows something is wrong. The team has competing theories about what. The Diagnose phase exists for exactly this. Three weeks of structured listening, data review, and pattern recognition usually surface the actual problem inside the first ten days.',
      service: { name: 'Start with the diagnostic', url: 'contact.html', why: 'A 60-minute call is enough to know whether a full Diagnose phase is the right next move. We will be honest if it is not.' }
    }
  };

  // Disqualify cases
  function getResult(answers) {
    // Out-of-band sizes get a polite redirect
    if (answers.q2 === 'under1') {
      return {
        headline: 'You may be earlier than where we work best.',
        body: 'Pinnacle engagements are built for owner-led businesses doing $1M to $50M. Below that, the work that compounds is usually founder-stage clarity rather than strategic redesign. We are happy to share a short list of better-fit advisors and resources for your stage.',
        fit: { name: 'Possibly not the right fit yet', why: 'Email info@pinnaclestrat.com with a one-line note about your situation. We will reply with a small list of advisors and books that fit your stage better than we would.' }
      };
    }
    if (answers.q2 === 'over50') {
      return {
        headline: 'You may be larger than where we work best.',
        body: 'Pinnacle engagements run with one principal. Three at a time. Above $50M the work usually needs a multi-person team and a different cadence. We can refer you to firms that staff that shape of engagement well.',
        fit: { name: 'Possibly not the right fit', why: 'Email info@pinnaclestrat.com with a one-line note about your situation. We will route to firms that fit your scale.' }
      };
    }

    // Map primary problem to archetype
    const arch = archetypes[answers.q1] || archetypes.unsure;

    // Tonal modifier based on duration
    let dur = '';
    if (answers.q3 === 'years') {
      dur = ' This has been the case for multiple years, which usually means past attempts treated symptoms instead of the underlying mechanism. The first job is to be specific about what is actually broken.';
    } else if (answers.q3 === 'year') {
      dur = ' A year is usually long enough that the cost of standing still is now larger than the cost of action.';
    }

    // Tonal modifier based on authority
    let auth = '';
    if (answers.q4 === 'unclear') {
      auth = ' One thing the diagnostic will surface early: who actually has authority over the strategy. Engagements without a clear decision-maker tend to stall in the Decide phase. Naming the person on call one is usually the first move.';
    } else if (answers.q4 === 'board') {
      auth = ' Board-led decision-making works in this method, with one adjustment. We add a board pre-read between the Diagnose and Decide phases so the working session lands clean.';
    }

    return {
      headline: arch.headline,
      body: arch.body + dur + auth,
      fit: { name: arch.service.name, why: arch.service.why, url: arch.service.url }
    };
  }

  submit.addEventListener('click', function () {
    const answers = {
      q1: getRadio('q1'),
      q2: getRadio('q2'),
      q3: getRadio('q3'),
      q4: getRadio('q4'),
      q5: getText('q5')
    };

    // Soft validation - don't block, but nudge if too many blanks
    const required = ['q1', 'q2', 'q3', 'q4'];
    const missing = required.filter(q => !answers[q]);
    if (missing.length > 0) {
      // Highlight first missing
      const first = document.querySelector(`.diag-question[data-q="${missing[0].slice(1)}"]`);
      if (first) {
        first.style.scrollMarginTop = '90px';
        first.scrollIntoView({ behavior: 'smooth', block: 'start' });
        first.style.boxShadow = '0 0 0 2px var(--gold-500) inset';
        setTimeout(() => { first.style.boxShadow = ''; }, 2000);
      }
      return;
    }

    const r = getResult(answers);
    headline.textContent = r.headline;
    body.textContent = r.body;

    let fitHTML = `<h4>Likely fit</h4><p><strong>${r.fit.name}.</strong> ${r.fit.why}</p>`;
    if (r.fit.url && r.fit.url !== 'contact.html') {
      fitHTML += `<p style="margin-top:0.75rem;"><a href="${r.fit.url}" style="color:var(--navy-900);border-bottom:1px solid var(--gold-500);font-size:0.9rem;font-weight:500;">Read more about ${r.fit.name} &rarr;</a></p>`;
    }
    fit.innerHTML = fitHTML;

    result.classList.add('show');
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  restart.addEventListener('click', function () {
    document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
    const ta = document.querySelector('textarea[name="q5"]');
    if (ta) ta.value = '';
    result.classList.remove('show');
    document.getElementById('diagnostic-tool').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
