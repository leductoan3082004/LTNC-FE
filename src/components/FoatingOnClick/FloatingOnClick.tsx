import {
  arrow,
  offset,
  shift,
  useFloating,
  useInteractions,
  type Placement,
  useDismiss,
  FloatingArrow,
  useClick
} from '@floating-ui/react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ElementType, Fragment, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
  arrowClassname?: string
  offsetValue?: number
  arrowWidth?: number
  arrowHeight?: number
}

export default function FloatingOnClick({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  placement,
  offsetValue = 10,
  arrowClassname = 'fill-white',
  arrowWidth = 30,
  arrowHeight = 10
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const arrowRef = useRef(null)
  const { x, y, refs, middlewareData, context, strategy } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(offsetValue), shift(), arrow({ element: arrowRef })],
    placement: placement || 'bottom'
  })
  // const click = useClick(context)
  const dismiss = useDismiss(context)

  const click = useClick(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])

  return (
    <Fragment>
      <Element ref={refs.setReference} {...getReferenceProps()} className={className}>
        {children}
      </Element>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
              zIndex: 10,
              transformOrigin: `${middlewareData.arrow?.x}px top`
            }}
            {...getFloatingProps()}
            initial={{ opacity: 0, y: '-5%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-5%' }}
            transition={{ duration: 0.1 }}
          >
            <div className={classNames('-translate-y-1')}>{renderPopover}</div>
            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={arrowWidth}
              height={arrowHeight}
              className={arrowClassname}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  )
}
