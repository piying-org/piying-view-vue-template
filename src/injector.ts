import { ChangeDetectionScheduler, ChangeDetectionSchedulerImpl, createRootInjector } from 'static-injector'
export const root = createRootInjector({
  providers: [
    {
      provide: ChangeDetectionScheduler,
      useClass: ChangeDetectionSchedulerImpl,
    },
  ],
})
