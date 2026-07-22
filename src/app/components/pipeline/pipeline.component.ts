import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PIPELINE_STEPS, PipelineStep } from '../../data/timeline.data';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-pipeline',
  standalone: true,
  templateUrl: './pipeline.component.html',
  styleUrl: './pipeline.component.scss',
})
export class PipelineComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pipeSection') pipeSection!: ElementRef<HTMLElement>;
  @ViewChild('pipeTrack') pipeTrack!: ElementRef<HTMLElement>;
  @ViewChild('lineFill') lineFill!: ElementRef<HTMLElement>;
  @ViewChild('pipeDetail') pipeDetail!: ElementRef<HTMLElement>;
  @ViewChild('pipeProgress') pipeProgress!: ElementRef<HTMLElement>;
  @ViewChild('progressNum') progressNum!: ElementRef<HTMLElement>;
  @ViewChild('detailText') detailText!: ElementRef<HTMLElement>;
  @ViewChild('detailStatus') detailStatus!: ElementRef<HTMLElement>;

  steps: PipelineStep[] = PIPELINE_STEPS;
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    const mm = gsap.matchMedia();

    this.ctx = gsap.context(() => {
      // Desktop: auto-playing pipeline triggered on scroll into view
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 769px)', () => {
        this.buildAutoTimeline('width', 0.8);
      });

      // Mobile: same auto-play, vertical layout
      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 768px)', () => {
        this.buildAutoTimeline('height', 0.7);
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.pipe__header, .pipe__subtitle, .pipe__desc', { opacity: 1 });
        gsap.set(this.pipeTrack.nativeElement, { opacity: 1 });
        gsap.set(this.pipeProgress.nativeElement, { opacity: 1 });
        gsap.set(this.pipeDetail.nativeElement, { opacity: 1, y: 0 });
        this.lineFill.nativeElement.style.width = '100%';
        this.progressNum.nativeElement.textContent = `${this.steps.length}`;
        this.lineFill.nativeElement.style.width = '100%';
        const nodes = gsap.utils.toArray<HTMLElement>('.pipe__node');
        nodes.forEach((node, i) => {
          if (i < nodes.length - 1) node.classList.add('passed');
          else node.classList.add('active');
        });
        this.detailText.nativeElement.textContent = this.steps[this.steps.length - 1].command;
        const badge = this.detailStatus.nativeElement.querySelector('.pipe__detail-badge');
        if (badge) badge.textContent = 'LIVE';
      });
    }, this.pipeSection.nativeElement);
  }

  private buildAutoTimeline(lineProp: 'width' | 'height', stepDelay: number): void {
    const nodes = gsap.utils.toArray<HTMLElement>('.pipe__node');
    const total = nodes.length;
    const detailTextEl = this.detailText.nativeElement;
    const badgeEl = this.detailStatus.nativeElement.querySelector('.pipe__detail-badge') as HTMLElement;
    const numEl = this.progressNum.nativeElement;
    const lineEl = this.lineFill.nativeElement;

    const tl = gsap.timeline({ paused: true });

    // Entrance
    tl.fromTo('.pipe__header', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
      .fromTo('.pipe__subtitle', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1)
      .fromTo('.pipe__desc', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.15)
      .fromTo(this.pipeTrack.nativeElement, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.2)
      .fromTo(this.pipeProgress.nativeElement, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.25)
      .fromTo(this.pipeDetail.nativeElement, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.3);

    // Steps — sequential, simple
    let t = 0.8;

    for (let i = 0; i < total; i++) {
      const pct = `${(i / (total - 1)) * 100}%`;

      // 1. Grow line to this node
      tl.to(lineEl, { [lineProp]: pct, duration: stepDelay * 0.5, ease: 'power2.inOut' }, t);

      // 2. Activate node (after line arrives)
      tl.call(() => {
        // Previous nodes → passed (checkmark)
        for (let j = 0; j < i; j++) {
          nodes[j].classList.remove('active');
          nodes[j].classList.add('passed');
        }
        // Current → active
        nodes[i].classList.add('active');

        numEl.textContent = `${i + 1}`;
        detailTextEl.textContent = this.steps[i].command;
        badgeEl.textContent = i === total - 1 ? 'LIVE ●' : 'RUNNING';
      }, [], t + stepDelay * 0.5);

      t += stepDelay;
    }

    // Final — mark last as passed too
    tl.call(() => {
      nodes[total - 1].classList.add('passed');
      badgeEl.textContent = 'DONE ✓';
    }, [], t + 0.5);

    // Trigger once on scroll into view
    ScrollTrigger.create({
      trigger: this.pipeSection.nativeElement,
      start: 'top 65%',
      once: true,
      onEnter: () => tl.play(),
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
